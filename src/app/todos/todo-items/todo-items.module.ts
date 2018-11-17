import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TodoItemsRoutingModule } from './todo-items-routing.module';

import { TodoItemsComponent } from './todo-items.component';

@NgModule({
  declarations: [
    TodoItemsComponent
  ],
  imports: [
    CommonModule,
    TodoItemsRoutingModule
  ],
})
export class TodoItemsModule {
}
