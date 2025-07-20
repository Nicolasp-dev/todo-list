import { InjectionToken } from '@angular/core';
import { CategoriesRepository } from '@core/services';

export const CATEGORIES_REPOSITORY = new InjectionToken<CategoriesRepository>(
  'CATEGORIES_REPOSITORY'
);
