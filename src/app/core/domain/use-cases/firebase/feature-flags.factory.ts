import { Provider } from '@angular/core';
import { GetCategoryFilterEnabledUseCase } from '@core/domain/use-cases/firebase';
import { FEATURE_FLAGS_REPOSITORY } from '@core/services';

export const CORE_FEATURE_FLAG_USE_CASE_PROVIDERS: Provider[] = [
  {
    provide: GetCategoryFilterEnabledUseCase,
    useFactory: (service: any) => new GetCategoryFilterEnabledUseCase(service),
    deps: [FEATURE_FLAGS_REPOSITORY],
  },
];
