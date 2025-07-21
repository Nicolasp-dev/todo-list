import { TestBed } from '@angular/core/testing';
import { NewTaskViewModel } from './new-task.view-model';
import {
  NonNullableFormBuilder,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AppendTaskUseCase } from '@core/domain/use-cases/tasks/append-task.use-case';
import { GetCategoriesUseCase } from '@core/domain/use-cases/categories';
import { Category, Task } from '@core/domain';

describe('NewTaskViewModel', () => {
  let vm: NewTaskViewModel;
  let appendTaskUseCaseSpy: jasmine.SpyObj<AppendTaskUseCase>;
  let getCategoriesUseCaseSpy: jasmine.SpyObj<GetCategoriesUseCase>;

  const mockCategories: Category[] = [
    { id: 1, title: 'Work' },
    { id: 2, title: 'Home' },
  ];

  beforeEach(() => {
    appendTaskUseCaseSpy = jasmine.createSpyObj('AppendTaskUseCase', [
      'execute',
    ]);
    getCategoriesUseCaseSpy = jasmine.createSpyObj('GetCategoriesUseCase', [
      'execute',
    ]);

    TestBed.configureTestingModule({
      providers: [
        NewTaskViewModel,
        { provide: AppendTaskUseCase, useValue: appendTaskUseCaseSpy },
        { provide: GetCategoriesUseCase, useValue: getCategoriesUseCaseSpy },
        { provide: NonNullableFormBuilder, useValue: new FormBuilder() },
      ],
    });

    vm = TestBed.inject(NewTaskViewModel);
  });

  describe('initialize()', () => {
    it('should initialize form and selectedCategoryIds when task is passed', async () => {
      const task: Task = {
        id: 123,
        title: 'Test Task',
        completed: false,
        categories: [{ id: 2, title: 'Home' }],
      };

      getCategoriesUseCaseSpy.execute.and.resolveTo(mockCategories);

      await vm.initialize(task);

      expect(vm.form.value.title).toBe('Test Task');
      expect(vm.selectedCategoryIds().has(2)).toBeTrue();
      expect(vm.categories()).toEqual(mockCategories);
    });

    it('should initialize empty state when no task is passed', async () => {
      getCategoriesUseCaseSpy.execute.and.resolveTo(mockCategories);

      await vm.initialize();

      expect(vm.form.value.title).toBe('');
      expect(vm.selectedCategoryIds().size).toBe(0);
      expect(vm.categories()).toEqual(mockCategories);
    });
  });

  describe('toggleCategory()', () => {
    it('should add category id when checked is true', () => {
      vm.toggleCategory(1, true);
      expect(vm.selectedCategoryIds().has(1)).toBeTrue();
    });

    it('should remove category id when checked is false', () => {
      vm.toggleCategory(1, true);
      vm.toggleCategory(1, false);
      expect(vm.selectedCategoryIds().has(1)).toBeFalse();
    });
  });

  describe('hasSelectedCategories', () => {
    it('should be false initially', () => {
      expect(vm.hasSelectedCategories()).toBeFalse();
    });

    it('should be true after toggling a category to checked', () => {
      vm.toggleCategory(1, true);
      expect(vm.hasSelectedCategories()).toBeTrue();
    });
  });

  describe('submit()', () => {
    beforeEach(() => {
      vm.categories.set(mockCategories);
    });

    it('should return null if form is invalid', async () => {
      vm.form.setValue({ title: '' });
      const result = await vm.submit();
      expect(result).toBeNull();
      expect(appendTaskUseCaseSpy.execute).not.toHaveBeenCalled();
    });

    it('should return updated task if editing an existing one', async () => {
      const task: Task = {
        id: 123,
        title: 'Old title',
        completed: false,
        categories: [],
      };
      vm.initialize(task);
      vm.categories.set(mockCategories);
      vm.form.setValue({ title: 'New Title' });
      vm.toggleCategory(1, true);

      const result = await vm.submit();

      expect(result).toEqual({
        id: 123,
        completed: false,
        title: 'New Title',
        categories: [{ id: 1, title: 'Work' }],
      });
    });
  });
});
