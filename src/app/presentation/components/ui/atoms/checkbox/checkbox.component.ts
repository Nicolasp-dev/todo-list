import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [IonicModule],
  template: `<ion-checkbox
    class="custom-checkbox "
    label-placement="stacked"
    [checked]="checked"
    (ionChange)="onChange($event)"
  ></ion-checkbox>`,
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() checked: boolean = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  public onChange(event: CustomEvent) {
    this.checkedChange.emit(event.detail.checked);
  }
}
