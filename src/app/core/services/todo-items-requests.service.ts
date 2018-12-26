import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { TodoItemModel } from '../models/todo-item';


@Injectable({
  providedIn: 'root'
})
export class TodoItemsRequestsService {

  constructor(
    private http: HttpClient
  ) {
  }

  fetchTodoItems() {
    return this.http.get<TodoItemModel[]>('todo-items');
  }

  addTodoItem(newTodoItem: TodoItemModel) {
    return this.http.post<TodoItemModel>('todo-items', newTodoItem);
  }

  toggleTodoItemComplete(todoItem: TodoItemModel) {
    return this.http.put<TodoItemModel>(`todo-items/${todoItem.id}`, todoItem);
  }

  deleteTodoItem(id: number) {
    return this.http.delete<TodoItemModel>(`todo-items/${id}`);
  }
}
