import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { TodoItemsRoutingModule } from './todo-items-routing.module';

import { FilterTodoItems } from './filter-todo-items.pipe';
import { TodoItemsComponent } from './todo-items.component';

@NgModule({
  declarations: [
    TodoItemsComponent,
    FilterTodoItems,
  ],
  imports: [
    SharedModule,
    TodoItemsRoutingModule
  ],
})
export class TodoItemsModule {
}
