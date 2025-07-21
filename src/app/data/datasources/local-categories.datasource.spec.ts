import { LocalCategoriesDatasource } from './local-categories.datasource';
import { Category } from '@core/domain/models/category.model';
import { StorageService } from '@data/datasources/storage.service';

describe('LocalCategoriesDatasource', () => {
  let datasource: LocalCategoriesDatasource;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  const mockCategories: Category[] = [
    { id: 1, title: 'Trabajo' },
    { id: 2, title: 'Ocio' },
  ];

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['get', 'set']);
    datasource = new LocalCategoriesDatasource(storageServiceSpy);
  });

  it('Given stored categories, When getCategories is called, Then it should return them', async () => {
    storageServiceSpy.get.and.resolveTo(mockCategories);

    const result = await datasource.getCategories();

    expect(result).toEqual(mockCategories);
    expect(storageServiceSpy.get).toHaveBeenCalledWith('categories');
  });

  it('Given no categories stored, When getCategories is called, Then it should return an empty array', async () => {
    storageServiceSpy.get.and.resolveTo(null);

    const result = await datasource.getCategories();

    expect(result).toEqual([]);
    expect(storageServiceSpy.get).toHaveBeenCalledWith('categories');
  });

  it('Given a list of categories, When saveCategories is called, Then it should store them', async () => {
    await datasource.saveCategories(mockCategories);

    expect(storageServiceSpy.set).toHaveBeenCalledWith(
      'categories',
      mockCategories
    );
  });
});
