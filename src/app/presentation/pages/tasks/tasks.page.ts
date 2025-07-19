import { Component, signal } from '@angular/core';
import { GetTasksUseCase, Task } from '@core/domain';
import { IonicModule } from '@ionic/angular';
import { TaskItemComponent } from '../../components/ui/molecules/task-item/task-item.component';

@Component({
  selector: 'app-home',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TaskItemComponent],
})
export class TasksPage {
  todos = signal<Task[]>([]);

  constructor(private getTodoUseCase: GetTasksUseCase) {}

  ngOnInit() {
    this.todos.set(this.getTodoUseCase.execute());
  }

  toggleTodoChecked(id: number, newValue: boolean) {
    const current = this.todos();
    const updated = current.map((t) =>
      t.id === id ? { ...t, completed: newValue } : t
    );
    this.todos.set(updated);
  }
}
