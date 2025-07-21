import { AppendCategoryUseCase } from './append-category.use-case';
import { Category } from '@core/domain/models';
import { CategoriesRepository } from '@core/services';

describe('AppendCategoryUseCase', () => {
  let useCase: AppendCategoryUseCase;
  let repositorySpy: jasmine.SpyObj<CategoriesRepository>;

  beforeEach(() => {
    repositorySpy = jasmine.createSpyObj('CategoriesRepository', [
      'getCategories',
      'saveCategories',
    ]);
    useCase = new AppendCategoryUseCase(repositorySpy);
  });

  it('should append a new category and save it', async () => {
    const existingCategories: Category[] = [
      { id: 1, title: 'Trabajo' },
      { id: 2, title: 'Personal' },
    ];

    const newCategory: Category = { id: 3, title: 'Compras' };
    repositorySpy.getCategories.and.resolveTo(existingCategories);
    repositorySpy.saveCategories.and.resolveTo();

    await useCase.execute(newCategory);

    expect(repositorySpy.getCategories).toHaveBeenCalled();
    expect(repositorySpy.saveCategories).toHaveBeenCalledWith([
      ...existingCategories,
      newCategory,
    ]);
  });
});
