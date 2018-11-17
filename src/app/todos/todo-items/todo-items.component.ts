import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoItemsService } from '../../core/services/todo-items.service';

import { TodoItemsModel } from '../../core/models/todo-items';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  todoItems: TodoItemsModel[];
  complete: boolean;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.todoItems = this.todoItemsService.getAllTodoItems();
    this.complete = this.route.snapshot.data['complete'];
  }
}
