import { Component, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomeConfig } from './home.config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [IonicModule],
})
export class HomePage {
  public readonly tabs = HomeConfig.tabs;
}
