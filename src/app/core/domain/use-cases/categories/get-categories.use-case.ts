import { Category } from '@core/domain/models/category.model';
import { CategoriesRepository } from '@core/services';

export class GetCategoriesUseCase {
  constructor(private repository: CategoriesRepository) {}

  async execute(): Promise<Category[]> {
    return this.repository.getCategories();
  }
}
