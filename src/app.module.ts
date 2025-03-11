import { Module } from '@nestjs/common';
import { TaskModule } from './app/task/task.module';

@Module({
  imports: [TaskModule],
})

export class AppModule {}
