import {
  Component,
  effect,
  EventEmitter,
  HostBinding,
  input,
  Output,
} from '@angular/core';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { IonicModule, IonIcon } from '@ionic/angular';
import { Task } from '@core/domain';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CheckboxComponent, IonicModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['task-item.component.scss'],
})
export class TaskItemComponent {
  public task = input<Task>();
  public checked = input<boolean>(false);

  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() editChange = new EventEmitter<number>();

  @HostBinding('class.task-item--checked') isChecked = false;

  constructor() {
    effect(() => {
      this.isChecked = this.checked();
    });
  }

  public onCheckedChange(newValue: boolean): void {
    this.checkedChange.emit(newValue);
    this.isChecked = newValue;
  }

  public onUpdate(): void {
    if (this.isChecked) return;

    this.editChange.emit(this.task()?.id);
  }
}
