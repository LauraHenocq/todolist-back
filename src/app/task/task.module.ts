import { Module } from '@nestjs/common';
import { TaskController } from './controller/task.controller';
import { TaskService } from './services/task.service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
