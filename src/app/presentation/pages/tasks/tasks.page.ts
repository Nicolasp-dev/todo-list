import { DeleteCompletedTasksUseCase } from '@core/domain';
import { Component, computed, signal } from '@angular/core';
import { GetTasksUseCase, SaveTasksUseCase, Task } from '@core/domain';
import { IonicModule } from '@ionic/angular';
import { TaskItemComponent } from '@ui/molecules/task-item/task-item.component';

@Component({
  selector: 'app-home',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TaskItemComponent],
})
export class TasksPage {
  todos = signal<Task[]>([]);

  constructor(
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly saveTasksUseCase: SaveTasksUseCase,
    private readonly deleteCompletedTasksUseCase: DeleteCompletedTasksUseCase
  ) {}

  async ngOnInit() {
    this.loadTasks();
  }

  ionViewWillEnter() {
    this.loadTasks();
  }

  async toggleTodoChecked(id: number, newValue: boolean) {
    const current = this.todos();
    const updated = current.map((t) =>
      t.id === id ? { ...t, completed: newValue } : t
    );
    this.todos.set(updated);
    await this.saveTasksUseCase.execute(updated);
  }

  readonly hasCheckedTasks = computed(() =>
    this.todos().some((t) => t.completed)
  );

  async deleteTasks() {
    const remaining = await this.deleteCompletedTasksUseCase.execute();
    this.todos.set(remaining);
  }

  private async loadTasks() {
    const tasks = await this.getTasksUseCase.execute();
    this.todos.set(tasks);
  }
}
