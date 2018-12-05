import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Actions, ofActionDispatched } from '@ngxs/store';
import { map, take } from 'rxjs/operators';

import { FetchTodoItemFail, FetchTodoItemSuccess } from '../../ngxs/todo-items/todo-items.actions';

import { TodoItemsService } from '../services/todo-items.service';

@Injectable({
  providedIn: 'root'
})

export class TodoItemsResolver implements Resolve<any> {

  constructor(
    private todoItemsService: TodoItemsService,
    private actions$: Actions,
    private router: Router
  ) {
  }

  resolve() {
    this.todoItemsService.fetchTodoItems();

    return this.actions$.pipe(
      ofActionDispatched(FetchTodoItemSuccess, FetchTodoItemFail),
      map(action => {
        if (action instanceof FetchTodoItemFail) {
          this.router.navigate(['auth']);
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
