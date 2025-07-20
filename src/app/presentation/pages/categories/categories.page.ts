import { Component, signal } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  FormControl,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Category } from '@core/domain';
import {
  AppendCategoryUseCase,
  GetCategoriesUseCase,
  SaveCategoriesUseCase,
} from '@core/domain/use-cases/categories';

interface TaskFormValue {
  title: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {
  categories = signal<Category[]>([]);
  form = this.buildForm();

  editMode = signal(false);

  constructor(
    private fb: NonNullableFormBuilder,
    private appendCategoryUseCase: AppendCategoryUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase,
    private saveCategoriesUseCase: SaveCategoriesUseCase,
    private toastCtrl: ToastController
  ) {}

  public ngOnInit(): void {
    this.loadCategories();
  }

  public async addCategory(): Promise<void> {
    if (this.form.invalid) return;

    const newCategory = this.buildCategory(this.form.getRawValue());
    await this.appendCategoryUseCase.execute(newCategory);

    this.categories.update((prev) => [...prev, newCategory]);
    this.form.reset();
  }

  public deleteCategory(id: number) {
    this.categories.update((prev) => prev.filter((c) => c.id !== id));
  }

  private buildForm(): FormGroup<{ title: FormControl<string> }> {
    return this.fb.group({
      title: this.fb.control('', [
        Validators.required,
        this.duplicatedCategoryValidator(),
      ]),
    });
  }

  private buildCategory(form: TaskFormValue): Category {
    return {
      id: Math.random(),
      title: form.title,
    };
  }

  private async loadCategories(): Promise<void> {
    const categories = await this.getCategoriesUseCase.execute();
    this.categories.set(categories);
  }

  async deleteSelected(id: number) {
    this.categories.update((prev) =>
      prev.filter((category) => category.id !== id)
    );
    this.categories.set(this.categories());
    await this.saveCategoriesUseCase.execute(this.categories());
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
}
