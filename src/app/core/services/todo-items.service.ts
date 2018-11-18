import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, retry } from 'rxjs/operators';

import { throwError } from 'rxjs/internal/observable/throwError';

import { TodoItemsModel } from '../models/todo-items';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  todoItems: TodoItemsModel[];
  todoItemsUrl = 'http://localhost:3000/todo-items';

  constructor(
    private http: HttpClient
  ) {
    this.fetchTodoItems();
  }

  toggleTodoItemComplete(id: number) {
    this.todoItems = this.todoItems.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
  }

  fetchTodoItems() {
    return this.http.get<TodoItemsModel[]>(this.todoItemsUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      .subscribe(items => this.todoItems = items);
  }

  addTodoItem(newTodoItem: TodoItemsModel[]) {
    this.todoItems = [...this.todoItems, ...newTodoItem];
  }

  deleteTodoItemById(id: number) {
    this.todoItems = this.todoItems.filter(item => id !== item.id);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}
