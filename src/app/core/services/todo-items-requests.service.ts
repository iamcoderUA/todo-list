import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { TodoItemsModel } from '../models/todo-items';


@Injectable({
  providedIn: 'root'
})
export class TodoItemsRequestsService {

  constructor(
    private http: HttpClient
  ) {
  }

  fetchTodoItems() {
    return this.http.get<TodoItemsModel[]>('todo-items');
  }

  addTodoItem(newTodoItem: TodoItemsModel) {
    return this.http.post<TodoItemsModel>('todo-items', newTodoItem);
  }

  toggleTodoItemComplete(id: number) {
    return this.http.put<TodoItemsModel>(`todo-items/${id}`, {});
  }

  deleteTodoItem(id: number) {
    this.http.delete<TodoItemsModel>(`todo-items/${id}`);
  }
}