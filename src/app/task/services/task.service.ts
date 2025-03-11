import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../models/create-task.dto';
import { UpdateTaskDto } from '../models/update-task.dto';
import { TaskEntity } from '../models/task.entity';
import { taskEntityMock } from '../models/mocks/task-entity.mock';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from '../types/task.status';

@Injectable()
export class TaskService {
  tasks: TaskEntity[] = taskEntityMock;

  getTasks(): TaskEntity[] {
    return this.tasks;
  }

  getTask(id: string): TaskEntity {
    return this.tasks.find(task => task.id === id)!;
  }

  createTask(createTaskDto: CreateTaskDto): string {
    const id = uuidv4();

    this.tasks.push(
      new TaskEntity({
        id,
        status: TaskStatus.TODO,
        ...createTaskDto
      })
    )
    return 'The task is created';
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): string {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) throw new Error(`Task with id ${id} is not found`);

    this.tasks[taskIndex] = new TaskEntity({
      id,
      ...updateTaskDto
    });

    return `Task with id ${id} has been updated`;
 
  }

  deleteTask(id: string): string {
    const taskToDelete = this.tasks.find(task => task.id === id);
    if (!taskToDelete) throw new Error(`Task with id ${id} is not found`);

    this.tasks.filter(task => task.id !== id);

    return `Task with id ${id} has been deleted`;
  }
}
