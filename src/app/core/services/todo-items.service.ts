import { Injectable } from '@angular/core';

import { TodoItemsModel } from '../models/todo-items';

import { TODO_ITEMS } from '../mock/mock-todo-items';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {
  todoItems: TodoItemsModel[] = TODO_ITEMS;

  toggleTodoItemComplete(id: number) {
    this.todoItems = this.todoItems.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
  }

  addTodoItem(newTodoItem: TodoItemsModel[]) {
    this.todoItems = [...this.todoItems, ...newTodoItem];
  }

  deleteTodoItemById(id: number) {
    this.todoItems = this.todoItems.filter(item => id !== item.id);
  }
}
