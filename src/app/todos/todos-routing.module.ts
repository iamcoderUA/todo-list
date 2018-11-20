import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoItemsResolver } from '../core/resolvers/todo-items-resolver.service';

import { TodosComponent } from './todos.component';

const todosRoutes: Routes = [
  {
    path: '',
    component: TodosComponent,
    children:
    [
      { path: '', loadChildren: './todo-items/todo-items.module#TodoItemsModule' },
    ],
    resolve: {todoItems: TodoItemsResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(todosRoutes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {
}
