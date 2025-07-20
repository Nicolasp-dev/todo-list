import { Category } from '@core/domain';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  categories: Category[];
}
