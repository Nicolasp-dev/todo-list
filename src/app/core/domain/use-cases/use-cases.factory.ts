import { Provider } from '@angular/core';
import { GetTasksUseCase } from '@core/domain';
import { TASK_REPOSITORY } from '@core/services';

export const CORE_USE_CASE_PROVIDERS: Provider[] = [
  {
    provide: GetTasksUseCase,
    useFactory: (repository: any) => new GetTasksUseCase(repository),
    deps: [TASK_REPOSITORY],
  },
];
