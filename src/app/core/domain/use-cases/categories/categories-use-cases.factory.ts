import { Provider } from '@angular/core';
import {
  AppendCategoryUseCase,
  GetCategoriesUseCase,
  SaveCategoriesUseCase,
} from '@core/domain/use-cases/categories';
import { CATEGORIES_REPOSITORY } from '@core/services';

export const CORE_CATEGORIES_USE_CASE_PROVIDERS: Provider[] = [
  {
    provide: GetCategoriesUseCase,
    useFactory: (repository: any) => new GetCategoriesUseCase(repository),
    deps: [CATEGORIES_REPOSITORY],
  },
  {
    provide: SaveCategoriesUseCase,
    useFactory: (repository: any) => new SaveCategoriesUseCase(repository),
    deps: [CATEGORIES_REPOSITORY],
  },
  {
    provide: AppendCategoryUseCase,
    useFactory: (repository: any) => new AppendCategoryUseCase(repository),
    deps: [CATEGORIES_REPOSITORY],
  },
];
