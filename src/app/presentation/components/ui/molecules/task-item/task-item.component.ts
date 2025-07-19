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

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CheckboxComponent, IonicModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['task-item.component.scss'],
})
export class TaskItemComponent {
  public title = input<string>();
  public checked = input<boolean>(false);

  @Output() checkedChange = new EventEmitter<boolean>();

  @HostBinding('class.task-item--checked') isChecked = false;

  constructor() {
    // Sincroniza la clase desde el inicio y cada vez que `checked()` cambie
    effect(() => {
      this.isChecked = this.checked();
    });
  }

  onCheckedChange(newValue: boolean) {
    this.checkedChange.emit(newValue);
    this.isChecked = newValue;
  }
}
