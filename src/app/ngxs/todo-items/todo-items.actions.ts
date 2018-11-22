import { HttpErrorResponse } from '@angular/common/http';

import { TodoItemsModel } from '../../core/models/todo-items';

export class FetchTodoItems {
  static readonly type = '[TodoItems] FetchTodoItems';
}

export class FetchTodoItemSuccess {
  static readonly type = '[TodoItems] FetchTodoItemsSuccess';

  constructor(
    public readonly payload: TodoItemsModel[]
  ) {
  }
}

export class FetchTodoItemFail {
  static readonly type = '[TodoItems] FetchTodoItemsFail';

  constructor(
    public readonly payload: HttpErrorResponse
  ) {
  }
}
