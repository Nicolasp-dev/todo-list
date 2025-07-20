import { DeleteCompletedTasksUseCase } from '@core/domain';
import { Component, computed, signal } from '@angular/core';
import { GetTasksUseCase, SaveTasksUseCase, Task } from '@core/domain';
import { IonicModule, ModalController } from '@ionic/angular';
import { TaskItemComponent } from '@presentation/components/ui';
import { NewTaskPage } from '../new-task/new-task.page';
import { NgClass } from '@angular/common';
import { FeatureFlagsService } from '@presentation/state';

@Component({
  selector: 'app-home',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TaskItemComponent, NgClass],
})
export class TasksPage {
  public readonly todos = signal<Task[]>([]);
  public isCategoryFilterEnabled!: boolean;

  constructor(
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly saveTasksUseCase: SaveTasksUseCase,
    private readonly deleteCompletedTasksUseCase: DeleteCompletedTasksUseCase,
    private featureFlagsService: FeatureFlagsService,
    private modalCtrl: ModalController
  ) {}

  public ngOnInit(): void {
    this.loadTasks();
  }

  public ionViewWillEnter(): void {
    this.isCategoryFilterEnabled =
      this.featureFlagsService.categoryFilterEnabled();
    this.loadTasks();
  }

  public readonly hasCheckedTasks = computed(() =>
    this.todos().some((t) => t.completed)
  );

  public async toggleTodoChecked(
    id: number,
    completed: boolean
  ): Promise<void> {
    const current = this.todos();
    const updated = this.updatedTasks(current, id, completed);
    this.todos.set(updated);
    await this.saveTasksUseCase.execute(updated);
  }

  public async onEditTask(id: number): Promise<void> {
    const task = this.todos().find((task) => task.id === id);
    if (!task || task.completed) return;

    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
      componentProps: { task },
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.25, 0.5, 0.9],
      showBackdrop: true,
      cssClass: 'bottom-sheet-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      const updatedTasks = this.todos().map((t) =>
        t.id === id
          ? { ...t, title: data.title, categories: data.categories }
          : t
      );

      this.todos.set(updatedTasks);
      await this.saveTasksUseCase.execute(updatedTasks);
    }
  }

  public async deleteTasks(): Promise<void> {
    const remaining = await this.deleteCompletedTasksUseCase.execute();
    this.todos.set(remaining);
  }

  private async loadTasks(): Promise<void> {
    const tasks = await this.getTasksUseCase.execute();
    this.todos.set(tasks);
  }

  private updatedTasks(tasks: Task[], id: number, completed: boolean): Task[] {
    return tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    );
  }

  public readonly searchCategory = signal('');

  public onSearchCategory(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchCategory.set(input.value.trim().toLowerCase());
  }

  public readonly filteredTasks = computed(() => {
    const search = this.searchCategory();
    if (!search) return this.todos();

    return this.todos().filter((task) =>
      task.categories?.some((c) => c.title.toLowerCase().includes(search))
    );
  });
}
