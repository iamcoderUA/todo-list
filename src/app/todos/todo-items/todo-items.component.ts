import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { map } from 'rxjs/operators';

import { TodoItemsService } from '../../core/services/todo-items.service';

import { TodoItemsModel } from '../../core/models/todo-items';


@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  todoItems$: Observable<TodoItemsModel[]>;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.todoItems$ = combineLatest(
      this.route.data,
      this.todoItemsService.todoItems$,
    ).pipe(
      map(([routeData, todoItems]) =>
        todoItems.filter(item => routeData.complete === undefined || routeData.complete === item.complete)
    ));
  }

  toggleTodoItemComplete(id: number) {
    this.todoItemsService.toggleTodoItemComplete(id);
  }

  deleteTodoItem(id: number) {
    this.todoItemsService.deleteTodoItem(id);
  }
}
