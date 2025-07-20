import { Injectable } from '@angular/core';
import { LocalCategoriesDatasource } from '@data/datasources/local-categories.datasource';
import { CategoriesRepository } from '@core/services';
import { Category } from '@core/domain';

@Injectable({ providedIn: 'root' })
export class LocalCategoriesRepository extends CategoriesRepository {
  constructor(private ds: LocalCategoriesDatasource) {
    super();
  }

  async getCategories(): Promise<Category[]> {
    return this.ds.getCategories();
  }

  async saveCategories(tasks: Category[]): Promise<void> {
    return this.ds.saveCategories(tasks);
  }
}
