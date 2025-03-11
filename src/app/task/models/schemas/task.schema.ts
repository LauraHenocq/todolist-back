import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TaskStatus } from '../../types/task.status';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], required: true })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
