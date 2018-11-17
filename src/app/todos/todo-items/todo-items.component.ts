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

  complete: boolean;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute,
  ) {
  }

  get todoItems () {
    return this.todoItemsService.todoItems as TodoItemsModel[];
  }

  ngOnInit() {
    this.complete = this.route.snapshot.data['complete'];
  }

  toggleTodoItemComplete(id: number) {
    this.todoItemsService.toggleTodoItemComplete(id);
  }

  deleteTodoItem(id: number) {
    this.todoItemsService.deleteTodoItemById(id);
  }
}
