import { Component, OnInit } from '@angular/core';

import { TodoItemsService } from '../../core/services/todo-items.service';

import { TodoItemsModel } from '../../core/models/todo-items';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {

  todoItems: TodoItemsModel[];

  constructor(
    private todoItemsService: TodoItemsService,
  ) {
  }

  ngOnInit() {
    this.todoItems = this.todoItemsService.todoItems;
  }
}
