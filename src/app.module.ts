import { Module } from '@nestjs/common';
import { TaskModule } from './app/task/task.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TaskModule,
    MongooseModule.forRoot(process.env.MONGODB_URI || 'default_mongo_uri'),
  ],
})
export class AppModule {}
