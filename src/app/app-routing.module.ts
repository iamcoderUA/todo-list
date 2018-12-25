import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoItemsGuard } from './core/guards/todo-items-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/todo-items', pathMatch: 'full' },
  {
    path: 'todo-items',
    loadChildren: './todos/todos.module#TodosModule',
    canActivate: [TodoItemsGuard],
  },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
