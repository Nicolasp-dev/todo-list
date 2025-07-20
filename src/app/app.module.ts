import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  CATEGORIES_REPOSITORY,
  FEATURE_FLAGS_REPOSITORY,
  TASKS_REPOSITORY,
} from '@core/services';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LocalTasksRepository } from '@data/repositories/local-tasks.repository';
import { CORE_TASKS_USE_CASE_PROVIDERS } from '@core/domain';
import { CORE_CATEGORIES_USE_CASE_PROVIDERS } from '@core/domain/use-cases/categories/categories-use-cases.factory';
import { LocalCategoriesRepository } from '@data/repositories/local-categories.repository';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import { CORE_FEATURE_FLAG_USE_CASE_PROVIDERS } from '@core/domain/use-cases/firebase';
import { RemoteFeatureFlagsRepository } from '@data/repositories/remote-feature-flags.repository';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideRemoteConfig(() => {
      const rc = getRemoteConfig();
      rc.settings = {
        minimumFetchIntervalMillis: 0,
        fetchTimeoutMillis: 60000,
      };
      return rc;
    }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: TASKS_REPOSITORY, useClass: LocalTasksRepository },
    ...CORE_TASKS_USE_CASE_PROVIDERS,
    { provide: CATEGORIES_REPOSITORY, useClass: LocalCategoriesRepository },
    ...CORE_CATEGORIES_USE_CASE_PROVIDERS,
    {
      provide: FEATURE_FLAGS_REPOSITORY,
      useClass: RemoteFeatureFlagsRepository,
    },
    ...CORE_FEATURE_FLAG_USE_CASE_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
