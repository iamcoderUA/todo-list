import { Pipe, PipeTransform } from '@angular/core';

import { TodoItemsModel } from '../../core/models/todo-items';

@Pipe ({ name: 'FilterTodoItems' })
export class FilterTodoItems implements PipeTransform {

  transform (items: TodoItemsModel[], complete: boolean): TodoItemsModel[] {
    if (items && items.length) {
      return items.filter(item => complete === undefined || complete === item.complete);
    }
  }
}
