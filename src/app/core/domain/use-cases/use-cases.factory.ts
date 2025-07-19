import { Provider } from '@angular/core';
import { GetTodosUseCase } from '@core/domain';
import { TODO_REPOSITORY } from '@core/services';

export const CORE_USE_CASE_PROVIDERS: Provider[] = [
  {
    provide: GetTodosUseCase,
    useFactory: (repository: any) => new GetTodosUseCase(repository),
    deps: [TODO_REPOSITORY],
  },
];
