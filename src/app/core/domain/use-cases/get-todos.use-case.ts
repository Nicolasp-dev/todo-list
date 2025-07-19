import { Todo } from '@core/domain';
import { TodoRepository } from '@core/services';

export class GetTodosUseCase {
  constructor(private todoRepo: TodoRepository) {}

  execute(): Todo[] {
    return this.todoRepo.getTodos();
  }
}
