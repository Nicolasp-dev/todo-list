import { Provider } from '@angular/core';
import {
  GetTasksUseCase,
  SaveTasksUseCase,
  DeleteCompletedTasksUseCase,
  AppendTaskUseCase,
} from '@core/domain';
import { TASK_REPOSITORY } from '@core/services';

export const CORE_USE_CASE_PROVIDERS: Provider[] = [
  {
    provide: GetTasksUseCase,
    useFactory: (repository: any) => new GetTasksUseCase(repository),
    deps: [TASK_REPOSITORY],
  },
  {
    provide: SaveTasksUseCase,
    useFactory: (repository: any) => new SaveTasksUseCase(repository),
    deps: [TASK_REPOSITORY],
  },
  {
    provide: AppendTaskUseCase,
    useFactory: (repository: any) => new AppendTaskUseCase(repository),
    deps: [TASK_REPOSITORY],
  },
  {
    provide: DeleteCompletedTasksUseCase,
    useFactory: (repository: any) =>
      new DeleteCompletedTasksUseCase(repository),
    deps: [TASK_REPOSITORY],
  },
];
