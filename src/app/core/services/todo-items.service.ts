import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Subject } from 'rxjs/internal/Subject';
import { mapTo, switchMap, withLatestFrom } from 'rxjs/operators';

import { TodoItemsModel } from '../models/todo-items';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  todoItems$: ReplaySubject<TodoItemsModel[]> = new ReplaySubject(1);
  fetchTodoItems$: Subject<any> = new Subject();
  addTodoItem$: Subject<TodoItemsModel> = new Subject();
  toggleTodoItemComplete$: Subject<number> = new Subject();
  deleteByItemId$: Subject<number> = new Subject();

  constructor(
    private http: HttpClient
  ) {
    this.fetchTodoItems$.pipe(
      switchMap(() => this.http.get<TodoItemsModel[]>('todo-items')),
    ).subscribe(todoItems => this.todoItems$.next(todoItems));

    this.addTodoItem$.pipe(
      switchMap(newTodoItem => this.http.post<TodoItemsModel>('todo-items', newTodoItem)),
      withLatestFrom(this.todoItems$)
    ).subscribe(([newTodoItem, todoItems]) => this.todoItems$.next([...todoItems, newTodoItem]));

    this.toggleTodoItemComplete$.pipe(
      withLatestFrom(this.todoItems$),
      switchMap(([id, todoItems]) => {
        const todoItemToEdit: TodoItemsModel = todoItems.find(item => id === item.id);
        return this.http.put<TodoItemsModel>(`todo-items/${id}`, {...todoItemToEdit, complete: !todoItemToEdit.complete})
      }),
      withLatestFrom(this.todoItems$)
    ).subscribe(([editedTodoItem, todoItems]) => {
        const updatedTodoItems = todoItems.map(item => item.id === editedTodoItem.id ? editedTodoItem : item);
        this.todoItems$.next(updatedTodoItems);
      });

    this.deleteByItemId$.pipe(
      switchMap(id => this.http.delete<TodoItemsModel>(`todo-items/${id}`).pipe(
        mapTo(id))
      ),
      withLatestFrom(this.todoItems$)
    ).subscribe(([id, todoItems]) => {
        const updatedTodoItems = todoItems.filter(todoItem => id !== todoItem.id);
        this.todoItems$.next(updatedTodoItems);
    });
  }

  fetchTodoItems() {
    this.fetchTodoItems$.next();
  }

  addTodoItem(newTodoItem: TodoItemsModel) {
    this.addTodoItem$.next(newTodoItem);
  }

  toggleTodoItemComplete(id: number) {
    this.toggleTodoItemComplete$.next(id);
  }

  deleteTodoItem(id: number) {
    this.deleteByItemId$.next(id);
  }
}
