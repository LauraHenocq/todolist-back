import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../models/create-task.dto';
import { UpdateTaskDto } from '../models/update-task.dto';

@Injectable()
export class TaskService {
  getTasks(): string {
    return 'All the tasks are returned';
  }

  getTask(id: string): string {
    return `The task with id ${id} is returned`;
  }

  createTask(createTaskDto: CreateTaskDto): string {
    return 'The task is created';
  }

  updateTask(updateTaskDto: UpdateTaskDto): string {
    return 'The task is updated';
  }

  deleteTask(id: string): string {
    return `The task with id ${id} is deleted`;
  }
}
