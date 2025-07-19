import { Task } from '@core/domain';

export abstract class TaskRepository {
  abstract getTasks(): Task[];
}
