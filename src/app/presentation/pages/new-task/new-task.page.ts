import { Component, Input, signal } from '@angular/core';
import { Category, Task } from '@core/domain';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppendTaskUseCase } from '@core/domain/use-cases/tasks/append-task.use-case';
import { GetCategoriesUseCase } from '@core/domain/use-cases/categories';

interface TaskFormValue {
  title: string;
}

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage {
  form = this.buildForm();
  public header: string = '';
  @Input() task!: Task;
  public categories = signal<Category[]>([]);
  selectedCategoryId: number | null = null;
  selectedCategoryIds = signal<Set<number>>(new Set());

  constructor(
    private fb: NonNullableFormBuilder,
    private appendTaskUseCase: AppendTaskUseCase,
    private modalCtrl: ModalController,
    private readonly getCategoriesUseCase: GetCategoriesUseCase
  ) {}

  public ngOnInit(): void {
    this.header = this.task ? 'Editar Tarea' : 'Creat Tarea';

    if (this.task) {
      this.form.patchValue({ title: this.task.title });

      const existingIds = this.task.categories?.map((c) => c.id) ?? [];
      this.selectedCategoryIds.set(new Set(existingIds));
    }

    this.setCategories();
  }

  public ionViewWillEnter() {
    this.setCategories();
  }

  private buildForm(): FormGroup<{ title: FormControl<string> }> {
    return this.fb.group({
      title: ['', Validators.required],
    });
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
  }

  onCategorySelected(id: number) {
    this.selectedCategoryId = id;
  }

  public async submitForm(): Promise<void> {
    if (this.form.invalid) return;

    const title = this.form.getRawValue().title;
    const selectedCategories = this.categories().filter((cat) =>
      this.selectedCategoryIds().has(cat.id)
    );

    if (this.task) {
      this.modalCtrl.dismiss({
        ...this.task,
        title,
        categories: selectedCategories,
      });
      return;
    }

    const task = this.buildTaks(this.form.getRawValue());
    await this.appendTaskUseCase.execute(task);
    this.form.reset();
    this.selectedCategoryIds.set(new Set());
  }

  private async setCategories(): Promise<void> {
    const categories = await this.getCategoriesUseCase.execute();
    this.categories.set(categories);
  }

  private buildTaks(form: TaskFormValue): Task {
    const selectedCategories = this.categories().filter((cat) =>
      this.selectedCategoryIds().has(cat.id)
    );
    console.log({
      id: Math.random(),
      completed: false,
      title: form.title,
      categories: selectedCategories,
    });
    return {
      id: Math.random(),
      completed: false,
      title: form.title,
      categories: selectedCategories,
    };
  }

  toggleCategory(id: number, checked: boolean) {
    this.selectedCategoryIds.update((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }

  get hasSelectedCategories(): boolean {
    return this.selectedCategoryIds().size > 0;
  }
}
