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

export class AddTodoItem {
  static readonly type = '[TodoItems] AddTodoItem';

  constructor(
    public readonly payload: TodoItemsModel
  ) {
  }
}

export class AddTodoItemSuccess {
  static readonly type = '[TodoItems] AddTodoItemSuccess';

  constructor(
    public readonly payload: TodoItemsModel
  ) {
  }
}

export class AddTodoItemFail {
  static readonly type = '[TodoItems] AddTodoItemFail';

  constructor(
    public readonly payload: HttpErrorResponse
  ) {
  }
}
export class DeleteTodoItem {
  static readonly type = '[TodoItems] DeleteTodoItem';

  constructor(
    public readonly payload: number
  ) {
  }
}

export class DeleteTodoItemSuccess {
  static readonly type = '[TodoItems] DeleteTodoItemSuccess';

  constructor(
    public readonly payload: number
  ) {
  }
}

export class DeleteTodoItemFail {
  static readonly type = '[TodoItems] DeleteTodoItemFail';

  constructor(
    public readonly payload: HttpErrorResponse
  ) {
  }
}

export class ToggleTodoItemComplete {
  static readonly type = '[TodoItems] ToggleTodoItemComplete';

  constructor(
    public readonly payload: number
  ) {
  }
}

export class ToggleTodoItemCompleteSuccess {
  static readonly type = '[TodoItems] ToggleTodoItemCompleteSuccess';

  constructor(
    public readonly payload: TodoItemsModel
  ) {
  }
}

export class ToggleTodoItemCompleteFail {
  static readonly type = '[TodoItems] ToggleTodoItemCompleteFail';

  constructor(
    public readonly payload: HttpErrorResponse
  ) {
  }
}
