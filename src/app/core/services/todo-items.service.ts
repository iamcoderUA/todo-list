import { Injectable } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';

import { FetchTodoItems } from '../../ngxs/todo-items/todo-items.actions';
import { TodoItemsState } from '../../ngxs/todo-items/todo-items.state';

import { TodoItemsModel } from '../models/todo-items';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  @Select(TodoItemsState.getTodoItems) todoItems$: Observable<TodoItemsModel[]>;
  @Select(TodoItemsState.getTodoItemsIdsCount) todoItemsCount$: Observable<number>;

  constructor(
    private store: Store
  ) {
  }

  fetchTodoItems() {
    this.store.dispatch(new FetchTodoItems());
  }

  addTodoItem(newTodoItem: TodoItemsModel) {
  }

  toggleTodoItemComplete(id: number) {
  }

  deleteTodoItem(id: number) {
  }
}
