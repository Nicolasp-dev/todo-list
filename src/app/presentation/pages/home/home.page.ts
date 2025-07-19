import { Component, signal } from '@angular/core';
import { GetTodosUseCase, Todo } from '@core/domain';
import { IonicModule } from '@ionic/angular';
import { TaskItemComponent } from '../../components/ui/molecules/task-item/task-item.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, TaskItemComponent],
})
export class HomePage {
  todos = signal<Todo[]>([]);

  constructor(private getTodoUseCase: GetTodosUseCase) {}

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
