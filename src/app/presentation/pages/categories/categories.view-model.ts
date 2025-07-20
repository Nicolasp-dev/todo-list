import { Injectable, signal, computed } from '@angular/core';
import {
  AppendCategoryUseCase,
  GetCategoriesUseCase,
  SaveCategoriesUseCase,
} from '@core/domain/use-cases/categories';
import { Category } from '@core/domain';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

interface TaskFormValue {
  title: string;
}

@Injectable()
export class CategoriesViewModel {
  public readonly categories = signal<Category[]>([]);
  public readonly editMode = signal(false);
  public readonly form: FormGroup<{ title: FormControl<string> }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private appendCategoryUseCase: AppendCategoryUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase,
    private saveCategoriesUseCase: SaveCategoriesUseCase
  ) {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup<{ title: FormControl<string> }> {
    return this.fb.group({
      title: this.fb.control('', [
        Validators.required,
        this.duplicatedCategoryValidator(),
      ]),
    });
  }

  private duplicatedCategoryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputValue = control.value?.toLowerCase().trim();
      const exists = this.categories().some(
        (c) => c.title.toLowerCase().trim() === inputValue
      );
      return exists ? { duplicated: true } : null;
    };
  }

  async loadCategories(): Promise<void> {
    const categories = await this.getCategoriesUseCase.execute();
    this.categories.set(categories);
  }

  async addCategory(): Promise<void> {
    if (this.form.invalid) return;

    const newCategory: Category = {
      id: Math.random(),
      title: this.form.getRawValue().title,
    };

    await this.appendCategoryUseCase.execute(newCategory);
    this.categories.update((prev) => [...prev, newCategory]);
    this.form.reset();
  }

  async deleteSelected(id: number): Promise<void> {
    this.categories.update((prev) =>
      prev.filter((category) => category.id !== id)
    );
    await this.saveCategoriesUseCase.execute(this.categories());
  }

  deleteCategoryLocal(id: number): void {
    this.categories.update((prev) => prev.filter((c) => c.id !== id));
  }
}
