import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from '../services/task.service';
import { tasksEntityMock, taskEntityMock } from '../models/mocks/task-entity.mock';
import { when } from 'jest-when';
import { CreateTaskDto } from '../models/create-task.dto';
import { TaskStatus } from '../types/task.status';
import { UpdateTaskDto } from '../models/update-task.dto';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;
  const taskId = 'task-id';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: jest.fn(),
            getTask: jest.fn(),
            createTask: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskController = module.get<TaskController>(TaskController);
  });

  describe('getTasks', () => {
    it('should call the getTasks service and return all the tasks when it is called', async () => {
      when(taskService.getTasks).mockReturnValue(tasksEntityMock);

      const result = await taskController.getTasks();

      expect(result).toEqual(tasksEntityMock);
    });
  });

  describe('getTask', () => {
    it('should call the getTask service and return the task corresponding to the given id when it is called', async () => {
      when(taskService.getTask).calledWith('task-id').mockReturnValue(taskEntityMock);

      const result = await taskController.getTask('task-id');

      expect(result).toEqual(taskEntityMock);
    });
  });

  describe('createTask', () => {
    it('should call the createTask service and create a task when it is called', async () => {
      const createTaskDtoMock: CreateTaskDto = {
        title: 'Ma nouvelle tâche',
        description: 'Description de ma nouvelle tâche',
      };

      when(taskService.createTask)
        .calledWith(createTaskDtoMock)
        .mockReturnValue('The task has been created');

      const result = await taskController.createTask(createTaskDtoMock);

      expect(result).toEqual('The task has been created');
    });
  });

  describe('updateTask', () => {
    it('should call the updateTask service and update the given task when it is called', async () => {
      const updateTaskDtoMock: UpdateTaskDto = {
        title: 'Ma première tâche modifiée',
        description: 'Description de ma première tâche modifiée',
        status: TaskStatus.TODO,
      };

      when(taskService.updateTask)
        .calledWith(taskId, updateTaskDtoMock)
        .mockReturnValue(`Task with id ${taskId} has been updated`);

      const result = await taskController.updateTask(taskId, updateTaskDtoMock);

      expect(result).toEqual(`Task with id ${taskId} has been updated`);
    });
  });

  describe('deleteTask', () => {
    it('should call the deleteTask service and delete the given task when it is called', async () => {
      when(taskService.deleteTask)
        .calledWith(taskId)
        .mockReturnValue(`Task with id ${taskId} has been deleted`);

      const result = await taskController.deleteTask(taskId);

      expect(result).toEqual(`Task with id ${taskId} has been deleted`);
    });
  });
});
