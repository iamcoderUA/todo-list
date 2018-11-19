import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';

import { TodoItemsService } from '../../core/services/todo-items.service';

import { TodoItemsModel } from '../../core/models/todo-items';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  complete: boolean;
  todoItems$: Observable<TodoItemsModel[]>;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.complete = this.route.snapshot.data['complete'];
    this.todoItems$ = this.todoItemsService.todoItems$;
  }

  toggleTodoItemComplete(id: number) {
    this.todoItemsService.toggleTodoItemComplete$.next(id);
  }

  deleteTodoItem(id: number) {
    this.todoItemsService.deleteByItemId$.next(id);
  }
}
