import { TaskStatus } from "../../types/task.status";
import { TaskEntity } from "../task.entity";


export const tasksEntityMock = [
  new TaskEntity({
    id: 'fake-generated-id-1',
    title: 'Ma première tâche',
    description: "Description de ma première tâche",
    status: TaskStatus.TODO
  }),
  new TaskEntity({
    id: 'fake-generated-id-2',
    title: 'Ma deuxième tâche',
    description: "Description de ma deuxième tâche",
    status: TaskStatus.TODO
  }),
  new TaskEntity({
    id: 'fake-generated-id-3',
    title: 'Ma troisième tâche',
    description: "Description de ma troisième tâche",
    status: TaskStatus.TODO
  }),
  new TaskEntity({
    id: 'fake-generated-id-4',
    title: 'Ma quatrième tâche',
    description: "Description de ma quatrième tâche",
    status: TaskStatus.TODO
  })
];

export const taskEntityMock = new TaskEntity({
  id: 'fake-generated-id-1',
  title: 'Ma première tâche',
  description: "Description de ma première tâche",
  status: TaskStatus.TODO
});