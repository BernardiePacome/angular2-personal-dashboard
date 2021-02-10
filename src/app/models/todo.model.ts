export class Todo {
  constructor(title: string, dueDate?: Date) {
    this.taskTitle = title;
    this.dueDate = dueDate;
  }

  public taskTitle = '';
  public done = false;
  public dueDate?: Date;
}
