import { InjectionToken } from '@angular/core';
import { TodoRepository } from '@core/services';

export const TODO_REPOSITORY = new InjectionToken<TodoRepository>(
  'TODO_REPOSITORY'
);
