import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../models/create-task.dto';
import { UpdateTaskDto } from '../models/update-task.dto';
import { TaskEntity } from '../models/task.entity';
import { Task as TaskModel } from '../models/schemas/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskStatus } from '../types/task.status';

@Injectable()
export class TaskService {
  constructor(@InjectModel(TaskModel.name) private taskModel: Model<TaskModel>) {}

  async getTasks(): Promise<TaskEntity[]> {
    const tasks = await this.taskModel.find().exec();

    const tasksToReturn = tasks.map(
      (task) =>
        new TaskEntity({
          title: task.title,
          description: task.description,
          status: task.status,
          id: task._id.toString(),
        }),
    );

    return tasksToReturn;
  }

  async getTask(id: string): Promise<TaskEntity> {
    const task = await this.taskModel.findById(id).exec();

    if (!task) throw new NotFoundException(`Task with id ${id} was not found`);

    return new TaskEntity({
      title: task.title,
      description: task.description,
      status: task.status,
      id: task._id.toString(),
    });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<string> {
    const taskToCreate = new TaskEntity({
      ...createTaskDto,
      status: TaskStatus.TODO
    }).toApi();
    
    const createdTask = await new this.taskModel(taskToCreate).save();
    return createdTask._id.toString();
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<string> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto).exec();
    if (!updatedTask) throw new NotFoundException(`Task with id ${id} was not found`);
    return `Task with id ${id} has been updated`;
  }

  async deleteTask(id: string): Promise<string> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    if (!deletedTask) throw new NotFoundException(`Task with id ${id} was not found`);

    return `Task with id ${id} has been deleted`;
  }
}
