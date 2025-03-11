import { Controller, Body, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../models/create-task.dto';
import { UpdateTaskDto } from '../models/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(): string {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTask(@Param('id') id: string): string {
    return this.taskService.getTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): string {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): string {
    return this.taskService.updateTask(updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): string {
    return this.taskService.deleteTask(id);
  }
}

