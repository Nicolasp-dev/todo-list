import { inject, Injectable, signal } from '@angular/core';
import { GetCategoryFilterEnabledUseCase } from '@core/domain/use-cases/firebase';

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  public readonly categoryFilterEnabled = signal<boolean>(false);
  private readonly getCategoryFilterEnabledUseCase = inject(
    GetCategoryFilterEnabledUseCase
  );

  constructor() {
    this.loadFlags();
  }

  private async loadFlags(): Promise<void> {
    const enabled = await this.getCategoryFilterEnabledUseCase.execute();
    this.categoryFilterEnabled.set(enabled);
  }
}
