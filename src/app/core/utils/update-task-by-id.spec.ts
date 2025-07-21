import { updateTaskById } from './update-task-by-id';
import { Task } from '@core/domain';

describe('updateTaskById', () => {
  const initialTasks: Task[] = [
    {
      id: 1,
      title: 'Comprar leche',
      completed: false,
      categories: [{ id: 1, title: 'Casa' }],
    },
    {
      id: 2,
      title: 'Leer libro',
      completed: false,
      categories: [{ id: 2, title: 'Ocio' }],
    },
  ];

  it('Given a task ID, When the task exists, Then it should be updated with the provided values', () => {
    const result = updateTaskById(initialTasks, 1, { completed: true });

    expect(result[0].completed).toBeTrue();
    expect(result[0].title).toBe('Comprar leche');
  });

  it('Given a task ID, When the task does not exist, Then the original array should be returned unchanged', () => {
    const result = updateTaskById(initialTasks, 999, { completed: true });

    expect(result).toEqual(initialTasks);
  });

  it('Given partial updates, When updating a task, Then only specified fields should change', () => {
    const result = updateTaskById(initialTasks, 2, { title: 'Leer novela' });

    expect(result[1].title).toBe('Leer novela');
    expect(result[1].completed).toBeFalse();
  });

  it('Given multiple tasks, When one is updated, Then others should remain unchanged', () => {
    const result = updateTaskById(initialTasks, 2, { completed: true });

    expect(result[0]).toEqual(initialTasks[0]); // unchanged
    expect(result[1].completed).toBeTrue(); // updated
  });
});
