import { Component } from '@angular/core';
import { GetTodosUseCase, Todo } from '@core/domain';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  todos: Todo[] = [];

  constructor(private getTodoUseCase: GetTodosUseCase) {}

  ngOnInit() {
    this.todos = this.getTodoUseCase.execute();
  }
}
