import { Component } from '@angular/core';

import { TodoItemModel } from '../../core/models/todo-item';

import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  newTodoItem: TodoItemModel = new TodoItemModel();

  constructor(
    private todoItemsService: TodoItemsService,
  ) {
  }

  addTodoItem() {
    if (this.newTodoItem.title) {
      this.todoItemsService.addTodoItem(this.newTodoItem);
      this.newTodoItem = new TodoItemModel();
    }
  }
}


