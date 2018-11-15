import { NgModule } from '@angular/core';

import { CompletedItemsRoutingModule } from './completed-items-routing.module';

import { CompletedItemsComponent } from './completed-items.component';

@NgModule({
  declarations: [
    CompletedItemsComponent
  ],
  imports: [
    CompletedItemsRoutingModule
  ],
})
export class CompletedItemsModule {
}
