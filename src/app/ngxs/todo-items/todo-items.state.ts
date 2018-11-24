import { Action, Selector, State, StateContext } from '@ngxs/store';

import { catchError, tap } from 'rxjs/operators';

import { TodoItemsModel } from '../../core/models/todo-items';
import { TodoItemsRequestsService } from '../../core/services/todo-items-requests.service';

import * as todoItemsActions from './todo-items.actions';


export interface TodoItemsStateModel {
  entities:
    {
      [id: number]: TodoItemsModel
    };
  ids: number[];
}

@State<TodoItemsStateModel>({
  name: 'todoItems',
  defaults: {
    entities: {},
    ids: []
  }
})
export class TodoItemsState {

  @Selector()
  static getTodoItems(state: TodoItemsStateModel) {
    return state.ids.map(id => state.entities[id]);
  }

  @Selector()
  static getTodoItemsIdsCount(state: TodoItemsStateModel) {
    return state.ids.length;
  }

  constructor(
    private todoItemsRequestsService: TodoItemsRequestsService
  ) {
  }

  @Action(todoItemsActions.FetchTodoItems)
  fetchTodoItems(
    ctx: StateContext<TodoItemsStateModel>
  ) {
    return this.todoItemsRequestsService.fetchTodoItems().pipe(
      tap(todoItems => ctx.dispatch(new todoItemsActions.FetchTodoItemSuccess(todoItems))),
      catchError(error => ctx.dispatch(new todoItemsActions.FetchTodoItemFail(error)))
    );
  }

  @Action(todoItemsActions.FetchTodoItemSuccess)
  fetchTodoItemSuccess(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: todoItems}: todoItemsActions.FetchTodoItemSuccess
  ) {
    ctx.setState({
      entities: todoItems.reduce((acc, todoItem) => ({
        ...acc,
        [todoItem.id]: todoItem
      }), {}),
      ids: todoItems.map(item => item.id)
    });
  }

  @Action(todoItemsActions.AddTodoItem)
  addTodoItem(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: todoItem}: todoItemsActions.AddTodoItem
  ) {
    return this.todoItemsRequestsService.addTodoItem(todoItem)
      .pipe(
        tap(item => ctx.dispatch(new todoItemsActions.AddTodoItemSuccess(item))),
        catchError(error => ctx.dispatch(new todoItemsActions.AddTodoItemFail(error)))
      );
  }

  @Action(todoItemsActions.AddTodoItemSuccess)
  addTodoItemSuccessfully(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: todoItem}: todoItemsActions.AddTodoItemSuccess
  ) {
    ctx.setState({
      entities: {
        ...ctx.getState().entities,
        [todoItem.id]: todoItem
      },
      ids: [...ctx.getState().ids, todoItem.id],
    });
  }

  @Action(todoItemsActions.DeleteTodoItem)
  deleteTodoItem(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: id}: todoItemsActions.DeleteTodoItem
  ) {
    return this.todoItemsRequestsService.deleteTodoItem(id).pipe(
      tap(() => ctx.dispatch(new todoItemsActions.DeleteTodoItemSuccess(id))),
      catchError(error => ctx.dispatch(new todoItemsActions.DeleteTodoItemFail(error)))
    );
  }

  @Action(todoItemsActions.DeleteTodoItemSuccess)
  deleteTodoItemSuccessfully(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: id}: todoItemsActions.DeleteTodoItemSuccess
  ) {
    ctx.patchState({
      ids: ctx.getState().ids.filter(itemId => itemId !== id)
    });
  }

  @Action(todoItemsActions.ToggleTodoItemComplete)
  toggleTodoItemsComplete(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: id}: todoItemsActions.ToggleTodoItemComplete
  ) {
    const todoItem = ctx.getState().entities[id];
    todoItem.complete = !todoItem.complete;
    return this.todoItemsRequestsService.toggleTodoItemComplete(todoItem).pipe(
      tap(item => ctx.dispatch(new todoItemsActions.ToggleTodoItemCompleteSuccess(item))),
      catchError(error => ctx.dispatch(new todoItemsActions.ToggleTodoItemCompleteFail(error)))
    );
  }

  @Action(todoItemsActions.ToggleTodoItemCompleteSuccess)
  toggleTodoItemSuccessfully(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: editedTodoItem}: todoItemsActions.ToggleTodoItemCompleteSuccess
  ) {
    ctx.patchState({
      entities: {
        ...ctx.getState().entities,
        [editedTodoItem.id]: editedTodoItem
      },
    });
  }

  @Action(todoItemsActions.DeleteTodoItemFail)
  @Action(todoItemsActions.AddTodoItemFail)
  @Action(todoItemsActions.ToggleTodoItemCompleteFail)
  @Action(todoItemsActions.FetchTodoItemFail)
  fetchTodoItemFail(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: error}: todoItemsActions.FetchTodoItemFail
  ) {
    console.error(error);
  }
}
