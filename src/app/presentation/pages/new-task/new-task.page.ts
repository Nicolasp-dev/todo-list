import { Component, Input, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task, Category } from '@core/domain';
import { NewTaskViewModel } from './new-task.view-model';
import { NewTaskConfig } from './new-task.config';
import { ButtonComponent } from '@presentation/components/ui/atoms/button/button.component';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
  providers: [NewTaskViewModel],
})
export class NewTaskPage {
  @Input() task!: Task;

  public readonly config = NewTaskConfig;
  public readonly form = this.vm.form;
  public readonly categories = this.vm.categories;
  public readonly selectedCategoryIds = this.vm.selectedCategoryIds;
  public readonly hasSelectedCategories = this.vm.hasSelectedCategories;
  public header: string = '';

  constructor(
    private modalCtrl: ModalController,
    private vm: NewTaskViewModel
  ) {}

  ngOnInit(): void {
    this.setHeader();
    this.vm.initialize(this.task);
  }

  ionViewWillEnter() {
    this.setHeader();
    this.vm.initialize(this.task);
  }

  public toggleCategory(id: number, checked: boolean) {
    this.vm.toggleCategory(id, checked);
  }

  public async submitForm(): Promise<void> {
    const result = await this.vm.submit();
    if (result) {
      this.modalCtrl.dismiss(result);
    }
  }

  private setHeader(): void {
    const { create, edit } = this.config.headers;
    this.header = this.task ? edit : create;
  }
}
