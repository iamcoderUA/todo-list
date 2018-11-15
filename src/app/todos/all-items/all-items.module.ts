import { NgModule } from '@angular/core';

import { AllItemsRoutingModule } from './all-items-routing.module';

import { AllItemsComponent } from './all-items.component';

@NgModule({
  declarations: [
    AllItemsComponent
  ],
  imports: [
    AllItemsRoutingModule
  ],
})
export class AllItemsModule {
}
