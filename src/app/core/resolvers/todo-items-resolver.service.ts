import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { take } from 'rxjs/operators';

import { TodoItemsService } from '../services/todo-items.service';

@Injectable({
  providedIn: 'root'
})

export class TodoItemsResolver implements Resolve<any> {

  constructor(
    private todoItemsService: TodoItemsService,
  ) {
  }

  resolve() {
    return this.todoItemsService.fetchTodoItems().pipe(
      take(1)
    );
  }
}
