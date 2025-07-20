import { InjectionToken } from '@angular/core';
import { FeatureFlagsRepository } from '@core/services';

export const FEATURE_FLAGS_REPOSITORY =
  new InjectionToken<FeatureFlagsRepository>('FEATURE_FLAGS_REPOSITORY');
