import { Provider } from '@angular/core';
import {
  GetTasksUseCase,
  SaveTasksUseCase,
  DeleteCompletedTasksUseCase,
  AppendTaskUseCase,
} from '@core/domain/use-cases/tasks';
import { TASKS_REPOSITORY } from '@core/services/tasks-repository';

export const CORE_TASKS_USE_CASE_PROVIDERS: Provider[] = [
  {
    provide: GetTasksUseCase,
    useFactory: (repository: any) => new GetTasksUseCase(repository),
    deps: [TASKS_REPOSITORY],
  },
  {
    provide: SaveTasksUseCase,
    useFactory: (repository: any) => new SaveTasksUseCase(repository),
    deps: [TASKS_REPOSITORY],
  },
  {
    provide: AppendTaskUseCase,
    useFactory: (repository: any) => new AppendTaskUseCase(repository),
    deps: [TASKS_REPOSITORY],
  },
  {
    provide: DeleteCompletedTasksUseCase,
    useFactory: (repository: any) =>
      new DeleteCompletedTasksUseCase(repository),
    deps: [TASKS_REPOSITORY],
  },
];
