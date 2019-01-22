import { NgModule } from '@angular/core';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../../environments/environment';

import { AuthState } from './auth';
import { TodoItemsState } from './todo-items/todo-items.state';
import { UserState } from './user';

import { LoginRequestState } from './requests/auth/login/login-request.state';
import { LogoutRequestState } from './requests/auth/logout/logout-request.state';
import { RequestsState } from './requests/requests.state';
import { MeRequestState } from './requests/user/me/me-request.state';
import { UserRequestState } from './requests/user/user/user-request.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      AuthState,
      UserState,
      TodoItemsState,

      // requests
      RequestsState,
      LoginRequestState,
      LogoutRequestState,
      MeRequestState,
      UserRequestState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
})
export class NgxsStoreModule {
}
