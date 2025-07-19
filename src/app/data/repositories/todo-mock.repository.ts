import { Injectable } from '@angular/core';
import { TodoRepository } from '@core/services';
import { Todo } from '@core/domain';

@Injectable({
  providedIn: 'root',
})
export class TodoMockRepository extends TodoRepository {
  public getTodos(): Todo[] {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i++,
      title: `Task ${i++}`,
      completed: false,
    }));
  }
}
