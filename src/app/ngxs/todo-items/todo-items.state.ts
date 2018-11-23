import { Action, Selector, State, StateContext } from '@ngxs/store';

import { catchError, tap } from 'rxjs/operators';

import { TodoItemsModel } from '../../core/models/todo-items';
import { TodoItemsRequestsService } from '../../core/services/todo-items-requests.service';

import * as todoItemsActions from './todo-items.actions';


export interface TodoItemsStateModel {
  todoItems:
    {
      [id: number]: TodoItemsModel
    };
  todoItemsIds: number[];
}

@State<TodoItemsStateModel>({
  name: 'todoItems',
  defaults: {
    todoItems: {},
    todoItemsIds: []
  }
})
export class TodoItemsState {

  @Selector()
  static getTodoItems(state: TodoItemsStateModel) {
    return state.todoItemsIds.map(id => state.todoItems[id]);
  }

  @Selector()
  static getTodoItemsIdsCount(state: TodoItemsStateModel) {
    return state.todoItemsIds.length;
  }

  constructor(
    private todoItemsRequestsService: TodoItemsRequestsService
  ) {
  }

  @Action(todoItemsActions.FetchTodoItems)
  fetchTodoItems(
    {dispatch}: StateContext<TodoItemsStateModel>
  ) {
    return this.todoItemsRequestsService.fetchTodoItems().pipe(
      tap(todoItems => dispatch(new todoItemsActions.FetchTodoItemSuccess(todoItems))),
      catchError(error => dispatch(new todoItemsActions.FetchTodoItemFail(error)))
    );
  }

  @Action(todoItemsActions.FetchTodoItemSuccess)
  fetchTodoItemSuccess(
    {setState}: StateContext<TodoItemsStateModel>,
    {payload: todoItems}: todoItemsActions.FetchTodoItemSuccess
  ) {
    setState({
      todoItems: todoItems.reduce((acc, todoItem) => ({
        ...acc,
        [todoItem.id]: todoItem
      }), {}),
      todoItemsIds: todoItems.map(item => item.id)
    });
  }

  @Action(todoItemsActions.FetchTodoItemFail)
  fetchTodoItemFail(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: error}: todoItemsActions.FetchTodoItemFail
  ) {
    console.error(error);
  }
}
