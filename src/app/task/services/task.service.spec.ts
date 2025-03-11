import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { taskEntityMock, tasksEntityMock } from '../models/mocks/task-entity.mock';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { when } from 'jest-when';
import { Task } from '../models/schemas/task.schema';
import { TaskStatus } from '../types/task.status';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../models/create-task.dto';
import { UpdateTaskDto } from '../models/update-task.dto';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskModel: Model<Task>;

  const mockTaskModel = {
    find: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    constructor: jest.fn().mockImplementation(function () {
      this.save = jest.fn().mockResolvedValue(this); // Simule la méthode save
    }),
};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
            provide: getModelToken('Task'),
            useValue: mockTaskModel,
        },
    ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskModel = module.get<Model<Task>>(getModelToken('Task'));
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const tasksFromApiMock = [
        {
          _id: 'fake-generated-id-1',
          title: 'Ma première tâche',
          description: "Description de ma première tâche",
          status: TaskStatus.TODO
        },
        {
          _id: 'fake-generated-id-2',
          title: 'Ma deuxième tâche',
          description: "Description de ma deuxième tâche",
          status: TaskStatus.TODO
        },
        {
          _id: 'fake-generated-id-3',
          title: 'Ma troisième tâche',
          description: "Description de ma troisième tâche",
          status: TaskStatus.TODO
        },
        {
          _id: 'fake-generated-id-4',
          title: 'Ma quatrième tâche',
          description: "Description de ma quatrième tâche",
          status: TaskStatus.TODO
        },
      ];

      mockTaskModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(tasksFromApiMock),
      });

      const result = await taskService.getTasks();
      expect(result).toEqual(tasksEntityMock);
    });
  });

  describe('getTask', () => {
    it('should return a task by its id', async () => {
      const task = {
        _id: 'fake-generated-id-1',
        title: 'Ma première tâche',
        description: "Description de ma première tâche",
        status: TaskStatus.TODO
      };
      
      when(mockTaskModel.findById)
        .calledWith('task-id')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValue(task),
        });

      const result = await taskService.getTask('task-id');
      expect(result).toEqual(taskEntityMock);
    });

    it('should throw a NotFoundException when task was not found', async () => {
      when(mockTaskModel.findById)
        .calledWith('task-id')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        });

      await expect(taskService.getTask('task-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTask', () => {
    it.skip('should create a task', async () => {
      const createTaskDto: CreateTaskDto = { title: 'New Task', description: 'New Description' };

      mockTaskModel.save.mockResolvedValue('Task has been created');

      const result = await taskService.createTask(createTaskDto);
      expect(result).toEqual('The task has been created');
      expect(mockTaskModel.save).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('updateTask', () => {
    const updateTaskDto: UpdateTaskDto = { title: 'Updated Task', description: 'updated description', status: TaskStatus.TODO };

    it('should update a task', async () => {
      const updatedTask = { ...updateTaskDto, _id: 'task-id' };
      when(mockTaskModel.findByIdAndUpdate)
        .calledWith('task-id', updateTaskDto)
        .mockReturnValue({
          exec: jest.fn().mockResolvedValue(updatedTask),
        });

      const result = await taskService.updateTask('task-id', updateTaskDto);
      expect(result).toEqual('Task with id task-id has been updated');
    });

    it('should throw a NotFoundException when task was not found for update', async () => {
      when(mockTaskModel.findByIdAndUpdate)
        .calledWith('task-id', updateTaskDto)
        .mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        });

      await expect(taskService.updateTask('task-id', updateTaskDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const deletedTask = { _id: 'task-id' };
      mockTaskModel.findByIdAndDelete.mockResolvedValue(deletedTask);

      const result = await taskService.deleteTask('task-id');
      expect(result).toEqual('Task with id task-id has been deleted');
    });

    it('should throw NotFoundException when task was not found for deletion', async () => {
      mockTaskModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(taskService.deleteTask('task-id')).rejects.toThrow(NotFoundException);
    });
  });
});
