import { Selector, State } from '@ngxs/store';

import { LoginRequestState } from './auth/login/login-request.state';
import { LogoutRequestState } from './auth/logout/logout-request.state';
import { IRequestsNestedState } from './requests.interface';
import { MeRequestState } from './user/me/me-request.state';
import { UserRequestState } from './user/user/user-request.state';


export interface RequestsStateModel {
}

@State<RequestsStateModel>({
  name: 'requests',
  defaults: {},
  children: [
    LoginRequestState,
    LogoutRequestState,
    UserRequestState,
    MeRequestState,
  ],
})
export class RequestsState {

  @Selector([
    LoginRequestState,
    LogoutRequestState,
    UserRequestState,
    MeRequestState,
  ])
  static loadingStatus(...states: IRequestsNestedState[]): boolean {
    return states
    // filter requests state and states that are not loading
      .filter(state => state && state.hasOwnProperty('loading') && state.loading)
      .length > 0;
  }
}
