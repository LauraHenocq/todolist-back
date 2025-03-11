import { TaskStatus } from "../types/task.status";

export type UpdateTaskDto = {
    title: string;
    description: string;
    status: TaskStatus;
  };
  