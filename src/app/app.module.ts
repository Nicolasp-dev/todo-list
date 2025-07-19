import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TASK_REPOSITORY } from '@core/services';
import { TasksMockRepository } from '@data/repositories';
import { CORE_USE_CASE_PROVIDERS } from '@core/domain/use-cases';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: TASK_REPOSITORY, useClass: TasksMockRepository },
    ...CORE_USE_CASE_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
