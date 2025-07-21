import { LocalCategoriesRepository } from './local-categories.repository';
import { LocalCategoriesDatasource } from '@data/datasources/local-categories.datasource';
import { Category } from '@core/domain';

describe('LocalCategoriesRepository', () => {
  let repo: LocalCategoriesRepository;
  let dsSpy: jasmine.SpyObj<LocalCategoriesDatasource>;

  beforeEach(() => {
    dsSpy = jasmine.createSpyObj('LocalCategoriesDatasource', [
      'getCategories',
      'saveCategories',
    ]);
    repo = new LocalCategoriesRepository(dsSpy);
  });

  it('should delegate getCategories to datasource', async () => {
    const mockData: Category[] = [{ id: 1, title: 'Test' }];
    dsSpy.getCategories.and.resolveTo(mockData);

    const result = await repo.getCategories();
    expect(result).toEqual(mockData);
    expect(dsSpy.getCategories).toHaveBeenCalled();
  });

  it('should delegate saveCategories to datasource', async () => {
    const categories: Category[] = [{ id: 1, title: 'Test' }];

    dsSpy.saveCategories.and.resolveTo();
    await repo.saveCategories(categories);

    expect(dsSpy.saveCategories).toHaveBeenCalledWith(categories);
  });
});
