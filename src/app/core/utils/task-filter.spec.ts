import { Task } from '@core/domain/models/task.model';
import { filterTasksByCategory } from './task-filter';

describe('filterTasksById', () => {
  const sampleTasks: Task[] = [
    {
      id: 1,
      title: 'Comprar leche',
      completed: false,
      categories: [{ id: 1, title: 'Compras' }],
    },
    {
      id: 2,
      title: 'Hacer ejercicio',
      completed: false,
      categories: [{ id: 2, title: 'Salud' }],
    },
    {
      id: 3,
      title: 'Revisar correo',
      completed: false,
      categories: [{ id: 3, title: 'Trabajo' }],
    },
  ];

  it('Given a query that matches a category, When filtering, Then return only tasks with matching categories', () => {
    const result = filterTasksByCategory(sampleTasks, 'salud');

    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Hacer ejercicio');
  });

  it('Given a query that matches multiple categories, When filtering, Then return all matching tasks', () => {
    const tasksWithOverlap = [
      ...sampleTasks,
      {
        id: 4,
        title: 'Ir al médico',
        completed: false,
        categories: [{ id: 2, title: 'Salud' }],
      },
    ];

    const result = filterTasksByCategory(tasksWithOverlap, 'salud');

    expect(result.length).toBe(2);
    expect(result.map((t) => t.title)).toContain('Hacer ejercicio');
    expect(result.map((t) => t.title)).toContain('Ir al médico');
  });

  it('Given an empty query, When filtering, Then return all tasks', () => {
    const result = filterTasksByCategory(sampleTasks, '');

    expect(result.length).toBe(sampleTasks.length);
  });

  it('Given a query that matches no category, When filtering, Then return an empty array', () => {
    const result = filterTasksByCategory(sampleTasks, 'viajes');

    expect(result.length).toBe(0);
  });

  it('Given a task with no categories, When filtering, Then ignore that task', () => {
    const tasksWithNoCategories = [
      ...sampleTasks,
      { id: 5, title: 'Vacío', completed: false, categories: [] },
    ];

    const result = filterTasksByCategory(tasksWithNoCategories, 'salud');

    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Hacer ejercicio');
  });
});
