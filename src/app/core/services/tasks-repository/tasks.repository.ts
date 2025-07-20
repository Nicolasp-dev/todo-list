import { Task } from '@core/domain';

export abstract class TasksRepository {
  abstract getTasks(): Promise<Task[]>;
  abstract saveTasks(tasks: Task[]): Promise<void>;
  abstract deleteTask(id: string): Promise<void>;
}
