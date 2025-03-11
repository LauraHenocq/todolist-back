import { Module } from '@nestjs/common';
import { TaskController } from './controller/task.controller';
import { TaskService } from './services/task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './models/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
