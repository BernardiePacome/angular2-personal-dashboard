import { Component, HostListener, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { element } from 'protractor';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  userText = '';

  todoList: Todo[] = [];
  constructor() {}

  ngOnInit(): void {
    const storage = localStorage.getItem('todolist');
    if (storage !== null) {
      this.todoList = JSON.parse(storage);
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.userText !== '') {
      this.addTodo(this.userText);
      this.userText = '';
    }
  }

  addTodo(title: string, dueDate?: Date): void {
    this.todoList.push(new Todo(title, dueDate));
    localStorage.setItem('todolist', JSON.stringify(this.todoList));
  }

  removeTodo(title: string): void {
    console.log('removed', title);
    const index = this.todoList.findIndex((todo) => todo.taskTitle === title);
    this.todoList.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(this.todoList));
  }

  toggleDone(): void {
    localStorage.setItem('todolist', JSON.stringify(this.todoList));
  }

  hasDoneTasks(): boolean {
    for (const todo of this.todoList) {
      if (todo.done) {
        return true;
      }
    }
    return false;
  }

  removeDoneTasks(): void {
    for (const todo of this.todoList) {
      if (todo.done) {
        this.removeTodo(todo.taskTitle);
      }
    }
  }
}
