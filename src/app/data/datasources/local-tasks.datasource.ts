import { Injectable } from '@angular/core';
import { Task } from '@core/domain/models/task.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class LocalTasksDatasource {
  private readonly storageKey = 'tasks';

  constructor(private storage: StorageService) {}

  async getTasks(): Promise<Task[]> {
    return this.storage.get<Task[]>(this.storageKey).then((res) => res ?? []);
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    return this.storage.set(this.storageKey, tasks);
  }

  async clearTasks(): Promise<void> {
    return this.storage.remove(this.storageKey);
  }

  deleteTask(id: string): Promise<void> {
    return this.storage.remove(id);
  }
}
