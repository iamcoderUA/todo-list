import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LogoutModule } from '../auth/logout/logout.module';

import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';

import { TodosRoutingModule } from './todos-routing.module';

import { TodosComponent } from './todos.component';

@NgModule({
  declarations: [
    TodosComponent,
  ],
  imports: [
    SharedModule,
    LogoutModule,
    FooterModule,
    HeaderModule,
    TodosRoutingModule,
  ],
})
export class TodosModule {
}
