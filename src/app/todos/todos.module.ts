import { NgModule } from '@angular/core';

import { ActiveItemsModule } from './active-items/active-items.module';
import { AllItemsModule } from './all-items/all-items.module';
import { CompletedItemsModule } from './completed-items/completed-items.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';

import { TodosRoutingModule } from './todos-routing.module';

import { TodosComponent } from './todos.component';


@NgModule({
  declarations: [
    TodosComponent,
  ],
  imports: [
    FooterModule,
    HeaderModule,
    AllItemsModule,
    ActiveItemsModule,
    CompletedItemsModule,
    TodosRoutingModule
  ],
})
export class TodosModule {
}
