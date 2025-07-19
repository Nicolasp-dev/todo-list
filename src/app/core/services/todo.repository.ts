import { Todo } from '@core/domain';

export abstract class TodoRepository {
  abstract getTodos(): Todo[];
}
