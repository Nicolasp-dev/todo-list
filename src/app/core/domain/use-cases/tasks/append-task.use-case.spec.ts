import { AppendTaskUseCase } from './append-task.use-case';
import { Task } from '@core/domain/models/task.model';
import { TasksRepository } from '@core/services';

describe('AppendTaskUseCase', () => {
  let useCase: AppendTaskUseCase;
  let repositorySpy: jasmine.SpyObj<TasksRepository>;

  beforeEach(() => {
    repositorySpy = jasmine.createSpyObj('TasksRepository', [
      'getTasks',
      'saveTasks',
    ]);
    useCase = new AppendTaskUseCase(repositorySpy);
  });

  it('Given existing tasks, When a new task is appended, Then it should be added and saved', async () => {
    // Arrange
    const existingTasks: Task[] = [
      { id: 1, title: 'Comprar pan', completed: false, categories: [] },
      { id: 2, title: 'Hacer ejercicio', completed: false, categories: [] },
    ];
    const newTask: Task = {
      id: 3,
      title: 'Leer libro',
      completed: false,
      categories: [],
    };

    repositorySpy.getTasks.and.resolveTo(existingTasks);
    repositorySpy.saveTasks.and.resolveTo();

    // Act
    await useCase.execute(newTask);

    // Assert
    expect(repositorySpy.getTasks).toHaveBeenCalled();
    expect(repositorySpy.saveTasks).toHaveBeenCalledWith([
      ...existingTasks,
      newTask,
    ]);
  });
});
