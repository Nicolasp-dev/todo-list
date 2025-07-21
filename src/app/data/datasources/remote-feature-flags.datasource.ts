import { inject, Injectable } from '@angular/core';
import {
  RemoteConfig,
  fetchAndActivate,
  getValue,
} from '@angular/fire/remote-config';
import { FeatureFlagsRepository } from '@core/services';

@Injectable({ providedIn: 'root' })
export class RemoteFeatureFlagsDatasource implements FeatureFlagsRepository {
  private remoteConfig = inject(RemoteConfig);

  async isCategoriesPageEnabled(): Promise<boolean> {
    try {
      await fetchAndActivate(this.remoteConfig);
      const value = getValue(
        this.remoteConfig,
        'show_categories_page'
      ).asBoolean();
      return value;
    } catch (e) {
      console.error('[RemoteConfig] Error fetching config', e);
      return false;
    }
  }
}
