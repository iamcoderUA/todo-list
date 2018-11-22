import {Selector, State} from '@ngxs/store';

import { TodoItemsModel } from '../../core/models/todo-items';

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
}
