import { Injectable } from '@angular/core';
import { TaskRepository } from '@core/services';
import { Task } from '@core/domain';

@Injectable({
  providedIn: 'root',
})
export class TasksMockRepository extends TaskRepository {
  public getTasks(): Task[] {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i++,
      title: `Task ${i++}`,
      completed: i % 2 ? true : false,
    }));
  }
}
