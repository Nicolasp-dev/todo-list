import { TasksRepository } from '@core/services';
import { Task } from '@core/domain';

export class SaveTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(tasks: Task[]): Promise<void> {
    return this.tasksRepository.saveTasks(tasks);
  }
}
