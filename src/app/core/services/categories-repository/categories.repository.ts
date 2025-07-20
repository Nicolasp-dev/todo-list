import { Category } from '@core/domain';

export abstract class CategoriesRepository {
  abstract getCategories(): Promise<Category[]>;
  abstract saveCategories(categories: Category[]): Promise<void>;
}
