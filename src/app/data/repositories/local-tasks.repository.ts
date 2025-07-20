import { Injectable } from '@angular/core';
import { TasksRepository } from '@core/services/tasks.repository';
import { Task } from '@core/domain/models/task.model';
import { LocalTasksDatasource } from '@data/datasources/local-tasks.datasource';

@Injectable({ providedIn: 'root' })
export class LocalTasksRepository extends TasksRepository {
  constructor(private ds: LocalTasksDatasource) {
    super();
  }

  async getTasks(): Promise<Task[]> {
    return this.ds.getTasks();
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    return this.ds.saveTasks(tasks);
  }

  async removeAll(): Promise<void> {
    return this.ds.clearTasks();
  }

  async deleteTask(id: string): Promise<void> {
    return this.ds.deleteTask(id);
  }
}
