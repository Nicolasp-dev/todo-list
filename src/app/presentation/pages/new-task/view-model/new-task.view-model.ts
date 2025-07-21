import { inject, Injectable, signal, computed } from '@angular/core';
import {
  FormGroup,
  Validators,
  NonNullableFormBuilder,
  FormControl,
} from '@angular/forms';
import { Task, Category } from '@core/domain';
import { AppendTaskUseCase } from '@core/domain/use-cases/tasks/append-task.use-case';
import { GetCategoriesUseCase } from '@core/domain/use-cases/categories';

interface TaskFormValue {
  title: string;
}

@Injectable()
export class NewTaskViewModel {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly appendTaskUseCase = inject(AppendTaskUseCase);
  private readonly getCategoriesUseCase = inject(GetCategoriesUseCase);

  public readonly form = this.fb.group({
    title: ['', Validators.required],
  });

  public readonly categories = signal<Category[]>([]);
  public readonly selectedCategoryIds = signal<Set<number>>(new Set());
  public readonly hasSelectedCategories = computed(
    () => this.selectedCategoryIds().size > 0
  );

  private task: Task | null = null;

  public initialize(task?: Task): void {
    this.task = task ?? null;

    if (task) {
      this.form.patchValue({ title: task.title });
      const ids = task.categories?.map((category) => category.id) ?? [];
      this.selectedCategoryIds.set(new Set(ids));
    }

    this.loadCategories();
  }

  private async loadCategories(): Promise<void> {
    const categories = await this.getCategoriesUseCase.execute();
    this.categories.set(categories);
  }

  public toggleCategory(id: number, checked: boolean): void {
    this.selectedCategoryIds.update((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }

  public async submit(): Promise<Task | null> {
    if (this.form.invalid) return null;

    const { title } = this.form.getRawValue();
    const selectedCategories = this.categories().filter((cat) =>
      this.selectedCategoryIds().has(cat.id)
    );

    if (this.task) {
      return {
        ...this.task,
        title,
        categories: selectedCategories,
      };
    }

    const newTask: Task = {
      id: Math.random(),
      completed: false,
      title,
      categories: selectedCategories,
    };

    await this.appendTaskUseCase.execute(newTask);
    this.form.reset();
    this.selectedCategoryIds.set(new Set());

    return null;
  }
}
