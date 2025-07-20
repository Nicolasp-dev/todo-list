import { InjectionToken } from '@angular/core';
import { TasksRepository } from '@core/services';

export const TASKS_REPOSITORY = new InjectionToken<TasksRepository>(
  'TASKS_REPOSITORY'
);
