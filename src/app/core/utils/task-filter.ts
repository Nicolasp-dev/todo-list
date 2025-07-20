import { Task } from '@core/domain';

export const filterTasksByCategory = (tasks: Task[], query: string): Task[] => {
  if (!query) return tasks;
  return tasks.filter((task) =>
    task.categories?.some((c) => c.title.toLowerCase().includes(query))
  );
};
