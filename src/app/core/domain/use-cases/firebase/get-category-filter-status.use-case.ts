import { FeatureFlagsRepository } from '@core/services';

export class GetCategoryFilterEnabledUseCase {
  constructor(private repository: FeatureFlagsRepository) {}

  execute(): Promise<boolean> {
    return this.repository.isCategoryFilterEnabled();
  }
}
