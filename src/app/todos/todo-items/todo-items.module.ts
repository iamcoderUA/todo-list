import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TodoItemsRoutingModule } from './todo-items-routing.module';

import { FilterTodoItems } from './filter-todo-items.pipe';
import { TodoItemsComponent } from './todo-items.component';

@NgModule({
  declarations: [
    TodoItemsComponent,
    FilterTodoItems,
  ],
  imports: [
    CommonModule,
    TodoItemsRoutingModule
  ],
})
export class TodoItemsModule {
}
