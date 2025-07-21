import { LocalTasksDatasource } from './local-tasks.datasource';
import { Task } from '@core/domain/models/task.model';
import { StorageService } from '@data/datasources/storage.service';

describe('LocalTasksDatasource', () => {
  let datasource: LocalTasksDatasource;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'Comprar pan',
      completed: false,
      categories: [{ title: 'Tienda', id: 1 }],
    },
    {
      id: 2,
      title: 'Estudiar Angular',
      completed: true,
      categories: [{ title: 'Personal', id: 2 }],
    },
  ];

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', [
      'get',
      'set',
      'remove',
    ]);
    datasource = new LocalTasksDatasource(storageServiceSpy);
  });

  it('Given stored tasks, When getTasks is called, Then it should return them', async () => {
    storageServiceSpy.get.and.resolveTo(mockTasks);

    const result = await datasource.getTasks();

    expect(result).toEqual(mockTasks);
    expect(storageServiceSpy.get).toHaveBeenCalledWith('tasks');
  });

  it('Given no tasks in storage, When getTasks is called, Then it should return an empty array', async () => {
    storageServiceSpy.get.and.resolveTo(null);

    const result = await datasource.getTasks();

    expect(result).toEqual([]);
    expect(storageServiceSpy.get).toHaveBeenCalledWith('tasks');
  });

  it('Given a task list, When saveTasks is called, Then it should store them in storage', async () => {
    await datasource.saveTasks(mockTasks);

    expect(storageServiceSpy.set).toHaveBeenCalledWith('tasks', mockTasks);
  });

  it('When clearTasks is called, Then it should remove the tasks key from storage', async () => {
    await datasource.clearTasks();

    expect(storageServiceSpy.remove).toHaveBeenCalledWith('tasks');
  });

  it('Given a task ID, When deleteTask is called, Then it should remove the task from storage', async () => {
    const taskId = '1';
    await datasource.deleteTask(taskId);

    expect(storageServiceSpy.remove).toHaveBeenCalledWith(taskId);
  });
});
