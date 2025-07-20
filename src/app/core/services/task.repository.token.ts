import { InjectionToken } from '@angular/core';
import { TasksRepository } from '@core/services';

export const TASK_REPOSITORY = new InjectionToken<TasksRepository>(
  'TASKS_REPOSITORY'
);
