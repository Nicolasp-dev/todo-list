import { Category } from '@core/domain/models/category.model';
import { CategoriesRepository } from '@core/services';

export class SaveCategoriesUseCase {
  constructor(private repository: CategoriesRepository) {}

  async execute(categories: Category[]): Promise<void> {
    return this.repository.saveCategories(categories);
  }
}
