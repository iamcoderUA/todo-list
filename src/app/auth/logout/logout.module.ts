import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { LogoutComponent } from './logout.component';

@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    LogoutComponent,
  ],
})
export class LogoutModule {
}
