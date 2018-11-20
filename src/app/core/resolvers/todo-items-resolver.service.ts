import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { TodoItemsService } from '../services/todo-items.service';

@Injectable({
  providedIn: 'root'
})

export class TodoItemsResolver implements Resolve<any> {

  constructor(
    private todoItemsService: TodoItemsService
  ) {
  }

  resolve() {
    this.todoItemsService.fetchTodoItems();
  }
}
