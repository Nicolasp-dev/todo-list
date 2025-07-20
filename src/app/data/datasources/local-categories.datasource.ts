import { Injectable } from '@angular/core';
import { Category } from '@core/domain/models/category.model';
import { CategoriesRepository } from '@core/services';
import { StorageService } from '@data/datasources/storage.service';

@Injectable({ providedIn: 'root' })
export class LocalCategoriesDatasource implements CategoriesRepository {
  private readonly storageKey = 'categories';

  constructor(private storage: StorageService) {}

  async getCategories(): Promise<Category[]> {
    return (await this.storage.get<Category[]>(this.storageKey)) ?? [];
  }

  async saveCategories(categories: Category[]): Promise<void> {
    await this.storage.set(this.storageKey, categories);
  }
}
