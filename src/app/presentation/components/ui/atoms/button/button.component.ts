import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [IonicModule, CommonModule],
  template: `<ion-button [expand]="expand" [type]="type" [disabled]="disabled">
    {{ text }}
  </ion-button> `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = 'Guardar';
  @Input() disabled: boolean = false;
  @Input() type: string = 'submit';
  @Input() expand: string = 'block';
}
