import { inject, Injectable, signal } from '@angular/core';
import { GetCategoriesPageFlagUseCase } from '@core/domain/use-cases/firebase';

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  public readonly isCategoriesPageEnabled = signal<boolean>(false);
  private readonly getCategoriesPageFlagUseCase = inject(
    GetCategoriesPageFlagUseCase
  );

  /* constructor() {
    this.loadFlags();
  } */

  public async loadFlags(): Promise<void> {
    const enabled = await this.getCategoriesPageFlagUseCase.execute();
    this.isCategoriesPageEnabled.set(enabled);
  }
}
