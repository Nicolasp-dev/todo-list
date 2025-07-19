import { InjectionToken } from '@angular/core';
import { TaskRepository } from '@core/services';

export const TASK_REPOSITORY = new InjectionToken<TaskRepository>(
  'TODO_REPOSITORY'
);
