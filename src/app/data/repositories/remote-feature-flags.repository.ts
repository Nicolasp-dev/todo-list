import { Injectable } from '@angular/core';
import { FeatureFlagsRepository } from '@core/services';
import { RemoteFeatureFlagsDatasource } from '@data/datasources/remote-feature-flags.datasource';

@Injectable({ providedIn: 'root' })
export class RemoteFeatureFlagsRepository extends FeatureFlagsRepository {
  constructor(private ds: RemoteFeatureFlagsDatasource) {
    super();
  }

  public isCategoriesPageEnabled(): Promise<boolean> {
    return this.ds.isCategoriesPageEnabled();
  }
}
