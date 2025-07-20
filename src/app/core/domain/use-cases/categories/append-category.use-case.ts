import { Category } from '@core/domain/models';
import { CategoriesRepository } from '@core/services';

export class AppendCategoryUseCase {
  constructor(private repository: CategoriesRepository) {}

  async execute(newCategory: Category): Promise<void> {
    const existingCategories = await this.repository.getCategories();
    const updatedTasks = [...existingCategories, newCategory];
    await this.repository.saveCategories(updatedTasks);
  }
}
