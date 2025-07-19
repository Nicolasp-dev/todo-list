import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TODO_REPOSITORY } from '@core/services';
import { TodoMockRepository } from '@data/repositories';
import { CORE_USE_CASE_PROVIDERS } from '@core/domain/use-cases';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: TODO_REPOSITORY, useClass: TodoMockRepository },
    ...CORE_USE_CASE_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
