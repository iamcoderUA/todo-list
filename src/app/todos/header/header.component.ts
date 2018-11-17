import { Component } from '@angular/core';

import { TodoItemsModel } from '../../core/models/todo-items';

import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  newTodoItem: TodoItemsModel = new TodoItemsModel();

  constructor(
    private todoItemsService: TodoItemsService,
  ) {
  }

  addTodoItem() {
    if (this.newTodoItem.title) {
      this.todoItemsService.addTodoItem([this.newTodoItem]);
      this.newTodoItem = new TodoItemsModel();
    }
  }
}


