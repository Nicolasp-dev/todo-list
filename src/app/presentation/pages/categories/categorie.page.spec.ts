import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesPage } from './categories.page';
import { CategoriesViewModel } from './view-model/categories.view-model';
import { FeatureFlagsService } from '@presentation/state';
import { AppendCategoryUseCase } from '@core/domain/use-cases/categories';
import { GetCategoriesUseCase } from '@core/domain/use-cases/categories';
import { SaveCategoriesUseCase } from '@core/domain/use-cases/categories';
import {
  NonNullableFormBuilder,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@presentation/components/ui/atoms/button/button.component';

describe('CategoriesPage', () => {
  let fixture: ComponentFixture<CategoriesPage>;
  let component: CategoriesPage;

  let featureFlagsServiceSpy: jasmine.SpyObj<FeatureFlagsService>;
  let categoriesViewModelSpy: jasmine.SpyObj<CategoriesViewModel>;

  beforeEach(async () => {
    featureFlagsServiceSpy = jasmine.createSpyObj('FeatureFlagsService', [
      'loadFlags',
      'isCategoriesPageEnabled',
    ]);

    categoriesViewModelSpy = jasmine.createSpyObj('CategoriesViewModel', [
      'loadCategories',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CategoriesPage,
        IonicModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
      ],
      providers: [
        { provide: FeatureFlagsService, useValue: featureFlagsServiceSpy },
        { provide: CategoriesViewModel, useValue: categoriesViewModelSpy },
        {
          provide: AppendCategoryUseCase,
          useValue: jasmine.createSpyObj('AppendCategoryUseCase', ['execute']),
        },
        {
          provide: GetCategoriesUseCase,
          useValue: jasmine.createSpyObj('GetCategoriesUseCase', ['execute']),
        },
        {
          provide: SaveCategoriesUseCase,
          useValue: jasmine.createSpyObj('SaveCategoriesUseCase', ['execute']),
        },
        { provide: NonNullableFormBuilder, useValue: new FormBuilder() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the page if the feature flag is false', async () => {
    featureFlagsServiceSpy.loadFlags.and.resolveTo();
    featureFlagsServiceSpy.isCategoriesPageEnabled.and.returnValue(false);

    await component.ngOnInit();

    expect(component.isPageEnabled).toBeFalse();
  });
});
