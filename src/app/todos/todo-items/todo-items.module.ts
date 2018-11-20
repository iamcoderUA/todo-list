import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { TodoItemsRoutingModule } from './todo-items-routing.module';

import { TodoItemsComponent } from './todo-items.component';

@NgModule({
  declarations: [
    TodoItemsComponent,
  ],
  imports: [
    SharedModule,
    TodoItemsRoutingModule
  ],
})
export class TodoItemsModule {
}
