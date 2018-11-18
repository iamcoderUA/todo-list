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

  fetchTodoItems() {
    return this.http.get<TodoItemsModel[]>(this.todoItemsUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      .subscribe(items => this.todoItems = [...items]);
  }

  addTodoItem(newTodoItem: TodoItemsModel) {
    return this.http.post<TodoItemsModel>(this.todoItemsUrl, newTodoItem)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(item => this.todoItems = [...this.todoItems, item]);
  }

  toggleTodoItemComplete(id: number) {
    const todoItemToEdit: TodoItemsModel = this.todoItems.find(item => id === item.id);
    this.http.put<TodoItemsModel>(`${this.todoItemsUrl}/${id}`, {...todoItemToEdit, complete: !todoItemToEdit.complete})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      .subscribe((todoItem: TodoItemsModel) => this.todoItems = this.todoItems.map(item =>
        item.id === todoItem.id ? todoItem : item)
      );
  }

  deleteTodoItemById(id: number) {
    return this.http.delete<TodoItemsModel>(`${this.todoItemsUrl}/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      .subscribe(item => this.todoItems = this.todoItems.filter(todoItem => id !== todoItem.id));
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
