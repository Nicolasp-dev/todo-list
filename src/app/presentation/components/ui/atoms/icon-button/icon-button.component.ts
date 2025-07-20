import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-icon-button',
  template: ` <ion-button
    [ngClass]="{ 'no-justify': !isCategoryFilterEnabled }"
    [disabled]="disabled"
    (click)="onClick()"
  >
    <ion-icon name="trash"></ion-icon>
  </ion-button>`,
  imports: [IonicModule, NgClass],
})
export class IconButtonComponent {
  @Input() isCategoryFilterEnabled: boolean = true;
  @Input() disabled: boolean = false;

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
