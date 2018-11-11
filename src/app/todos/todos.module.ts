import { NgModule } from '@angular/core';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';

@NgModule({
  declarations: [
    TodosComponent
  ],
  imports: [
    TodosRoutingModule
  ],
})
export class TodosModule {
}
