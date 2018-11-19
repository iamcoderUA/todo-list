import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { TodoItemsService } from '../../core/services/todo-items.service';

import { TodoItemsModel } from '../../core/models/todo-items';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  todoItems$: Observable<TodoItemsModel[]>;

  constructor(
    private todoItemsService: TodoItemsService,
  ) {
  }

  ngOnInit() {
    this.todoItems$ = this.todoItemsService.todoItems$;
  }
}


