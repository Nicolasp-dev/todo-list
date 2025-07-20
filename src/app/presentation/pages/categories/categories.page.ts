// categories.page.ts
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesViewModel } from './categories.view-model';
import { CategoriesConfig } from './categories.config';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  providers: [CategoriesViewModel],
})
export class CategoriesPage {
  public config = CategoriesConfig;
  public vm = inject(CategoriesViewModel);

  public ngOnInit(): void {
    this.vm.loadCategories();
  }
}
