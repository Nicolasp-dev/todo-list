export abstract class FeatureFlagsRepository {
  abstract isCategoriesPageEnabled(): Promise<boolean>;
}
