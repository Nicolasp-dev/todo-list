import { Task } from '@core/domain/models/task.model';
import { TasksRepository } from '@core/services';

export class AppendTaskUseCase {
  constructor(private repository: TasksRepository) {}

  async execute(newTask: Task): Promise<void> {
    const existingTasks = await this.repository.getTasks();
    const updatedTasks = [...existingTasks, newTask];
    await this.repository.saveTasks(updatedTasks);
  }
}
