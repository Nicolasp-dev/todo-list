import { FeatureFlagsRepository } from '@core/services';

export class GetCategoriesPageFlagUseCase {
  constructor(private repository: FeatureFlagsRepository) {}

  execute(): Promise<boolean> {
    return this.repository.isCategoriesPageEnabled();
  }
}
