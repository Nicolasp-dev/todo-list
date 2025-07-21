import { DeleteCompletedTasksUseCase } from '@core/domain';
import { Component, computed, signal } from '@angular/core';
import { GetTasksUseCase, SaveTasksUseCase, Task } from '@core/domain';
import { IonicModule, ModalController } from '@ionic/angular';
import { TaskItemComponent } from '@presentation/components/ui';
import { NewTaskPage } from '../new-task/new-task.page';
import { FeatureFlagsService } from '@presentation/state';
import { TasksPageConfig } from './tasks.config';
import { IconButtonComponent } from '@presentation/components/ui/atoms/icon-button/icon-button.component';
import { filterTasksByCategory } from '@core/utils/task-filter';
import { updateTaskById } from '@core/utils/update-task-by-id';

@Component({
  selector: 'app-home',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TaskItemComponent, IconButtonComponent],
})
export class TasksPage {
  public readonly config = TasksPageConfig;
  public readonly tasks = signal<Task[]>([]);
  public readonly searchCategory = signal('');

  constructor(
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly saveTasksUseCase: SaveTasksUseCase,
    private readonly deleteCompletedTasksUseCase: DeleteCompletedTasksUseCase,
    private modalCtrl: ModalController
  ) {}

  public ngOnInit(): void {
    this.loadTasks();
  }

  public ionViewWillEnter(): void {
    this.loadTasks();
  }

  public readonly hasCheckedTasks = computed(() =>
    this.tasks().some((t) => t.completed)
  );

  public readonly filteredTasks = computed(() => {
    return filterTasksByCategory(this.tasks(), this.searchCategory());
  });

  public onSearchCategory(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchCategory.set(input.value.trim().toLowerCase());
  }

  public async toggleTodoChecked(
    id: number,
    completed: boolean
  ): Promise<void> {
    const tasks = updateTaskById(this.tasks(), id, { completed });
    await this.updateTasks(tasks);
  }

  public async onEditTask(id: number): Promise<void> {
    const task = this.tasks().find((task) => task.id === id);
    if (!task || task.completed) return;

    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
      componentProps: { task },
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.25, 0.5, 0.9],
      showBackdrop: true,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      const tasks = updateTaskById(this.tasks(), id, {
        title: data.title,
        categories: data.categories,
      });

      await this.updateTasks(tasks);
    }
  }

  public async deleteTasks(): Promise<void> {
    const remaining = await this.deleteCompletedTasksUseCase.execute();
    this.tasks.set(remaining);
  }

  private async loadTasks(): Promise<void> {
    const tasks = await this.getTasksUseCase.execute();
    this.tasks.set(tasks);
  }

  private async updateTasks(tasks: Task[]): Promise<void> {
    this.tasks.set(tasks);
    await this.saveTasksUseCase.execute(tasks);
  }
}
