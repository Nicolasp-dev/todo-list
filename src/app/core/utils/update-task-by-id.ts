import { Task } from '@core/domain';

export const updateTaskById = (
  tasks: Task[],
  id: number,
  updates: Partial<Task>
): Task[] => {
  return tasks.map((task) => (task.id === id ? { ...task, ...updates } : task));
};
