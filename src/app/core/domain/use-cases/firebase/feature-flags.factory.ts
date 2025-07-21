import { Provider } from '@angular/core';
import { GetCategoriesPageFlagUseCase } from '@core/domain/use-cases/firebase';
import { FEATURE_FLAGS_REPOSITORY } from '@core/services';

export const CORE_FEATURE_FLAG_USE_CASE_PROVIDERS: Provider[] = [
  {
    provide: GetCategoriesPageFlagUseCase,
    useFactory: (service: any) => new GetCategoriesPageFlagUseCase(service),
    deps: [FEATURE_FLAGS_REPOSITORY],
  },
];
