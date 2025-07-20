import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CATEGORIES_REPOSITORY, TASKS_REPOSITORY } from '@core/services';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LocalTasksRepository } from '@data/repositories/local-tasks.repository';
import { CORE_TASKS_USE_CASE_PROVIDERS } from '@core/domain';
import { CORE_CATEGORIES_USE_CASE_PROVIDERS } from '@core/domain/use-cases/categories/categories-use-cases.factory';
import { LocalCategoriesRepository } from '@data/repositories/local-categories.repository';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: TASKS_REPOSITORY, useClass: LocalTasksRepository },
    { provide: CATEGORIES_REPOSITORY, useClass: LocalCategoriesRepository },
    ...CORE_TASKS_USE_CASE_PROVIDERS,
    ...CORE_CATEGORIES_USE_CASE_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
