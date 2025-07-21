import { LocalTasksRepository } from './local-tasks.repository';
import { LocalTasksDatasource } from '@data/datasources/local-tasks.datasource';
import { Task } from '@core/domain/models/task.model';

describe('LocalTasksRepository', () => {
  let repository: LocalTasksRepository;
  let datasourceSpy: jasmine.SpyObj<LocalTasksDatasource>;

  beforeEach(() => {
    datasourceSpy = jasmine.createSpyObj('LocalTasksDatasource', [
      'getTasks',
      'saveTasks',
      'clearTasks',
      'deleteTask',
    ]);

    repository = new LocalTasksRepository(datasourceSpy);
  });

  it('should delegate getTasks to datasource', async () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Test', completed: false, categories: [] },
    ];
    datasourceSpy.getTasks.and.resolveTo(mockTasks);

    const result = await repository.getTasks();

    expect(result).toEqual(mockTasks);
    expect(datasourceSpy.getTasks).toHaveBeenCalled();
  });

  it('should delegate saveTasks to datasource', async () => {
    const tasks: Task[] = [
      { id: 2, title: 'Save me', completed: false, categories: [] },
    ];
    datasourceSpy.saveTasks.and.resolveTo();

    await repository.saveTasks(tasks);

    expect(datasourceSpy.saveTasks).toHaveBeenCalledWith(tasks);
  });

  it('should delegate removeAll to clearTasks in datasource', async () => {
    datasourceSpy.clearTasks.and.resolveTo();

    await repository.removeAll();

    expect(datasourceSpy.clearTasks).toHaveBeenCalled();
  });

  it('should delegate deleteTask to datasource', async () => {
    const id = '123';
    datasourceSpy.deleteTask.and.resolveTo();

    await repository.deleteTask(id);

    expect(datasourceSpy.deleteTask).toHaveBeenCalledWith(id);
  });
});
