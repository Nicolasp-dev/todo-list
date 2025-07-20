import { TasksRepository } from '@core/services';
import { Task } from '@core/domain';

export class DeleteCompletedTasksUseCase {
  constructor(private repository: TasksRepository) {}

  async execute(): Promise<Task[]> {
    const tasks = await this.repository.getTasks();
    const remaining = tasks.filter((task) => !task.completed);
    await this.repository.saveTasks(remaining);

    return remaining;
  }
}
