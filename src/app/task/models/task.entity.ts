import { TaskStatus } from "../types/task.status";


export type TaskEntityProps = {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
};

export class TaskEntity {
  public readonly id?: string;
  public title: string;
  public description: string;
  private _status: TaskStatus;

  constructor(props: TaskEntityProps) {
    this.id = props.id;
    this.title = props.title;
    this._status = props.status;
  }

  public get status(): TaskStatus {
    return this._status;
  }

  public setTaskStatus(status: TaskStatus): void {
    this._status = status;
  }
}
