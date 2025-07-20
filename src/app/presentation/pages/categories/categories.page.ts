import { GetCategoriesUseCase } from './../../../core/domain/use-cases/categories/get-categories.use-case';
import { AppendCategoryUseCase } from './../../../core/domain/use-cases/categories/append-category.use-case';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  FormControl,
} from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Category } from '@core/domain';

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
  categoriesToDelete = signal<Set<number>>(new Set());

  constructor(
    private fb: NonNullableFormBuilder,
    private alertCtrl: AlertController,
    private appendCategoryUseCase: AppendCategoryUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  public async addCategory(): Promise<void> {
    if (this.form.invalid) return;

    const newCategory = this.buildTaks(this.form.getRawValue());
    await this.appendCategoryUseCase.execute(newCategory);

    this.categories.update((prev) => [...prev, newCategory]);
    this.form.reset();
  }

  deleteCategory(id: number) {
    this.categories.update((prev) => prev.filter((c) => c.id !== id));
  }

  async editCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Editar categoría',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: category.title,
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.categories.update((prev) =>
              prev.map((c) =>
                c.id === category.id ? { ...c, name: data.name } : c
              )
            );
          },
        },
      ],
    });

    await alert.present();
  }

  private buildForm(): FormGroup<{ title: FormControl<string> }> {
    return this.fb.group({
      title: ['', Validators.required],
    });
  }

  private buildTaks(form: TaskFormValue): Category {
    return {
      id: Math.random(),
      title: form.title,
    };
  }

  private async loadCategories(): Promise<void> {
    const categories = await this.getCategoriesUseCase.execute();
    this.categories.set(categories);
  }

  toggleEditMode() {
    this.editMode.update((v) => !v);
    console.log(this.editMode());
    this.categoriesToDelete.set(new Set());
  }

  toggleCategoryForDeletion(id: number) {
    const current = new Set(this.categoriesToDelete());
    current.has(id) ? current.delete(id) : current.add(id);
    this.categoriesToDelete.set(current);
  }

  async confirmDeleteSelected() {
    const remaining = this.categories().filter(
      (cat) => !this.categoriesToDelete().has(cat.id)
    );
    this.categories.set(remaining);
    // await this.saveCategoriesUseCase.execute(remaining);
    this.editMode.set(false);
    this.categoriesToDelete.set(new Set());
  }

  trackById(index: number, item: Category) {
    return item.id;
  }
}
