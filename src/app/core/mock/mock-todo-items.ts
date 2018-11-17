import { TodoItemsModel } from '../models/todo-items';

export const TODO_ITEMS: TodoItemsModel[] = [
  new TodoItemsModel({title: 'Call John', complete: true}),
  new TodoItemsModel({title: 'Call Mary', complete: true}),
  new TodoItemsModel({title: 'Call Scott'}),
  new TodoItemsModel({title: 'Call Ben'}),
  new TodoItemsModel({title: 'Call Kira'}),
];
