import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { TodoItemsModel } from '../models/todo-items';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  todoItems: TodoItemsModel[];

  constructor(
    private http: HttpClient
  ) {
    this.fetchTodoItems();
  }

  fetchTodoItems() {
    return this.http.get<TodoItemsModel[]>('todo-items')
      .subscribe(todoItems => this.todoItems = [...todoItems]);
  }

  addTodoItem(newTodoItem: TodoItemsModel) {
    return this.http.post<TodoItemsModel>('todo-items', newTodoItem)
      .subscribe(todoItem => this.todoItems = [...this.todoItems, todoItem]);
  }

  toggleTodoItemComplete(id: number) {
    const todoItemToEdit: TodoItemsModel = this.todoItems.find(item => id === item.id);
    this.http.put<TodoItemsModel>(`todo-items/${id}`, {...todoItemToEdit, complete: !todoItemToEdit.complete})
      .subscribe(todoItem => this.todoItems = this.todoItems.map(item => item.id === todoItem.id ? todoItem : item));
  }

  deleteTodoItemById(id: number) {
    return this.http.delete<TodoItemsModel>(`todo-items/${id}`)
      .subscribe(() => this.todoItems = this.todoItems.filter(todoItem => id !== todoItem.id));
  }
}
