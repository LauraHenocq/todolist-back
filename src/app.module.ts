import { Module } from '@nestjs/common';
import { TaskModule } from './app/task/task.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TaskModule,
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todolistdb'),
  ],
})

export class AppModule {}
