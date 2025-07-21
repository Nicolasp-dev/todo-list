import { FeatureFlagsService } from '@presentation/state';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesViewModel } from './view-model/categories.view-model';
import { CategoriesConfig } from './categories.config';
import { ButtonComponent } from '@presentation/components/ui/atoms/button/button.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './categories.page.html',
  providers: [CategoriesViewModel],
})
export class CategoriesPage {
  public config = CategoriesConfig;
  public isPageEnabled = true;

  constructor(
    private featureFlagsService: FeatureFlagsService,
    public vm: CategoriesViewModel
  ) {}

  async ngOnInit(): Promise<void> {
    await this.featureFlagsService.loadFlags();
    this.isPageEnabled = this.featureFlagsService.isCategoriesPageEnabled();
    this.vm.loadCategories();
  }
}
