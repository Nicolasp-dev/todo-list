export abstract class FeatureFlagsRepository {
  abstract isCategoryFilterEnabled(): Promise<boolean>;
}
