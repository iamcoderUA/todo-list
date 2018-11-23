import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  todoItemsCount$: Observable<number>;

  constructor(
    private todoItemsService: TodoItemsService,
  ) {
  }

  ngOnInit() {
    this.todoItemsCount$ = this.todoItemsService.todoItemsCount$;
  }
}


