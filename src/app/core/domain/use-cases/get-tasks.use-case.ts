import { Task } from '@core/domain';
import { TaskRepository } from '@core/services';

export class GetTasksUseCase {
  constructor(private todoRepo: TaskRepository) {}

  execute(): Task[] {
    return this.todoRepo.getTasks();
  }
}
