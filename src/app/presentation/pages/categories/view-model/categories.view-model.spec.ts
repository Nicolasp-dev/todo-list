import {
  AppendCategoryUseCase,
  GetCategoriesUseCase,
  SaveCategoriesUseCase,
} from '@core/domain/use-cases/categories';
import { NonNullableFormBuilder, FormBuilder } from '@angular/forms';
import { Category } from '@core/domain';
import { TestBed } from '@angular/core/testing';
import { CategoriesViewModel } from './categories.view-model';

describe('CategoriesViewModel', () => {
  let viewModel: CategoriesViewModel;
  let appendCategoryUseCaseSpy: jasmine.SpyObj<AppendCategoryUseCase>;
  let getCategoriesUseCaseSpy: jasmine.SpyObj<GetCategoriesUseCase>;
  let saveCategoriesUseCaseSpy: jasmine.SpyObj<SaveCategoriesUseCase>;
  let fb: NonNullableFormBuilder;

  beforeEach(() => {
    appendCategoryUseCaseSpy = jasmine.createSpyObj('AppendCategoryUseCase', [
      'execute',
    ]);
    getCategoriesUseCaseSpy = jasmine.createSpyObj('GetCategoriesUseCase', [
      'execute',
    ]);
    saveCategoriesUseCaseSpy = jasmine.createSpyObj('SaveCategoriesUseCase', [
      'execute',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CategoriesViewModel,
        { provide: AppendCategoryUseCase, useValue: appendCategoryUseCaseSpy },
        { provide: GetCategoriesUseCase, useValue: getCategoriesUseCaseSpy },
        { provide: SaveCategoriesUseCase, useValue: saveCategoriesUseCaseSpy },
        { provide: NonNullableFormBuilder, useValue: new FormBuilder() },
      ],
    });

    viewModel = TestBed.inject(CategoriesViewModel);
    fb = TestBed.inject(NonNullableFormBuilder);
  });

  it('should create the view model', () => {
    expect(viewModel).toBeTruthy();
  });

  describe('loadCategories', () => {
    it('should load categories and update signal', async () => {
      const mockCategories: Category[] = [{ id: 1, title: 'Work' }];
      getCategoriesUseCaseSpy.execute.and.resolveTo(mockCategories);

      await viewModel.loadCategories();

      expect(viewModel.categories()).toEqual(mockCategories);
    });
  });

  describe('addCategory', () => {
    it('should add category and update signal if form is valid', async () => {
      viewModel.categories.set([]);
      viewModel.form.setValue({ title: 'New' });

      appendCategoryUseCaseSpy.execute.and.resolveTo(undefined);

      await viewModel.addCategory();

      expect(appendCategoryUseCaseSpy.execute).toHaveBeenCalled();
      expect(viewModel.categories().length).toBe(1);
      expect(viewModel.form.value.title).toBeNull();
    });
  });

  describe('deleteSelected', () => {
    it('should remove the category and call saveCategories', async () => {
      const initial: Category[] = [
        { id: 1, title: 'A' },
        { id: 2, title: 'B' },
      ];
      viewModel.categories.set(initial);
      saveCategoriesUseCaseSpy.execute.and.resolveTo(undefined);

      await viewModel.deleteSelected(1);

      expect(viewModel.categories().length).toBe(1);
      expect(viewModel.categories()[0].id).toBe(2);
      expect(saveCategoriesUseCaseSpy.execute).toHaveBeenCalledWith([
        { id: 2, title: 'B' },
      ]);
    });
  });

  describe('deleteCategoryLocal', () => {
    it('should remove category locally without calling saveCategories', () => {
      const initial: Category[] = [
        { id: 1, title: 'A' },
        { id: 2, title: 'B' },
      ];
      viewModel.categories.set(initial);

      viewModel.deleteCategoryLocal(2);

      expect(viewModel.categories().length).toBe(1);
      expect(viewModel.categories()[0].id).toBe(1);
    });
  });

  describe('duplicatedCategoryValidator', () => {
    it('should return duplicated error if title already exists', () => {
      viewModel.categories.set([{ id: 1, title: 'Test' }]);

      const control = fb.control('test');
      const result = (viewModel as any).duplicatedCategoryValidator()(control);

      expect(result).toEqual({ duplicated: true });
    });

    it('should return null if title does not exist', () => {
      viewModel.categories.set([{ id: 1, title: 'Test' }]);

      const control = fb.control('New');
      const result = (viewModel as any).duplicatedCategoryValidator()(control);

      expect(result).toBeNull();
    });
  });
});
