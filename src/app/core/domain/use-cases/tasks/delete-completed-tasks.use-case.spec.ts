import { DeleteCompletedTasksUseCase } from './delete-completed-tasks.use-case';
import { Task } from '@core/domain/models/task.model';
import { TasksRepository } from '@core/services';

describe('DeleteCompletedTasksUseCase', () => {
  let useCase: DeleteCompletedTasksUseCase;
  let repositorySpy: jasmine.SpyObj<TasksRepository>;

  beforeEach(() => {
    repositorySpy = jasmine.createSpyObj('TasksRepository', [
      'getTasks',
      'saveTasks',
    ]);
    useCase = new DeleteCompletedTasksUseCase(repositorySpy);
  });

  it('Given a list with completed and uncompleted tasks, When executing the use case, Then only uncompleted tasks should remain and be saved', async () => {
    // Arrange
    const tasks: Task[] = [
      { id: 1, title: 'Tarea A', completed: true, categories: [] },
      { id: 2, title: 'Tarea B', completed: false, categories: [] },
      { id: 3, title: 'Tarea C', completed: true, categories: [] },
      { id: 4, title: 'Tarea D', completed: false, categories: [] },
    ];
    const expectedRemaining = tasks.filter((t) => !t.completed);

    repositorySpy.getTasks.and.resolveTo(tasks);
    repositorySpy.saveTasks.and.resolveTo();

    // Act
    const result = await useCase.execute();

    // Assert
    expect(repositorySpy.getTasks).toHaveBeenCalled();
    expect(repositorySpy.saveTasks).toHaveBeenCalledWith(expectedRemaining);
    expect(result).toEqual(expectedRemaining);
  });
});
