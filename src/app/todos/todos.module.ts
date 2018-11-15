import { NgModule } from '@angular/core';

import { HeaderModule } from './header/header.module';
import { TodosRoutingModule } from './todos-routing.module';

import { TodosComponent } from './todos.component';

@NgModule({
  declarations: [
    TodosComponent
  ],
  imports: [
    HeaderModule,
    TodosRoutingModule
  ],
})
export class TodosModule {
}
