import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TASK_REPOSITORY } from '@core/services';
import { CORE_USE_CASE_PROVIDERS } from '@core/domain/use-cases';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LocalTasksRepository } from '@data/repositories/local-tasks.repository';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicStorageModule.forRoot()),
    { provide: TASK_REPOSITORY, useClass: LocalTasksRepository },
    ...CORE_USE_CASE_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
