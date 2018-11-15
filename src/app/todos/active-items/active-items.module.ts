import { NgModule } from '@angular/core';

import { ActiveItemsRoutingModule } from './active-items-routing.module';

import { ActiveItemsComponent } from './active-items.component';

@NgModule({
  declarations: [
    ActiveItemsComponent
  ],
  imports: [
    ActiveItemsRoutingModule
  ],
})
export class ActiveItemsModule {
}
