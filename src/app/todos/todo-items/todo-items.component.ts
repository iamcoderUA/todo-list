import { Component, OnInit } from '@angular/core';

import { TodoItemsService } from '../../core/services/todo-items.service';

import { TodoItemsModel } from '../../core/models/todo-items';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  todoItems: TodoItemsModel[];

  constructor(
    private todoItemsService: TodoItemsService,
  ) {
  }

  ngOnInit() {
    this.todoItems = this.todoItemsService.todoItems;
  }
}
