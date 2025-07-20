import { DeleteCompletedTasksUseCase } from '@core/domain';
import { Component, computed, signal } from '@angular/core';
import { GetTasksUseCase, SaveTasksUseCase, Task } from '@core/domain';
import { IonicModule, ModalController } from '@ionic/angular';
import { TaskItemComponent } from '@ui/molecules/task-item/task-item.component';
import { NewTaskPage } from '../new-task/new-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TaskItemComponent],
})
export class TasksPage {
  public readonly todos = signal<Task[]>([]);

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
    if (!task) return;

    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
      componentProps: { task },
      breakpoints: [0, 0.4, 0.9],
      initialBreakpoint: 0.4,
      showBackdrop: true,
      cssClass: 'bottom-sheet-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      debugger;
      const updatedTasks = this.todos().map((t) =>
        t.id === id ? { ...t, title: data.title } : t
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
}
