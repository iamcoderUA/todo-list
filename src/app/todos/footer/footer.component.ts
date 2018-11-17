import { Component } from '@angular/core';

import { TodoItemsModel } from '../../core/models/todo-items';

import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private todoItemsService: TodoItemsService,
  ) {
  }

  get todoItems () {
    return this.todoItemsService.todoItems as TodoItemsModel[];
  }
}


