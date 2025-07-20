import { Task } from '@core/domain';
import { TasksRepository } from '@core/services';

export class GetTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(): Promise<Task[]> {
    return this.tasksRepository.getTasks();
  }
}
