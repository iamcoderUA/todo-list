import { Injectable } from '@angular/core';

import { TodoItemsModel } from '../models/todo-items';

import { TODO_ITEMS } from '../mock/mock-todo-items';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {
  todoItems: TodoItemsModel[] = TODO_ITEMS;

  getAllTodoItems() {
    return this.todoItems;
  }
}

