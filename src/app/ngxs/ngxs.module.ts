import { NgModule } from '@angular/core';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../../environments/environment';

import { AuthState } from './auth';
import { LoginRequestState } from './requests/auth/login/login-request.state';
import { RequestsState } from './requests/requests.state';
import { TodoItemsState } from './todo-items/todo-items.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      AuthState,
      TodoItemsState,

      // requests
      RequestsState,
      LoginRequestState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
})
export class NgxsStoreModule {
}
