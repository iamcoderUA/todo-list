import { Selector } from '@ngxs/store';

import { AuthState, AuthStateModel } from './auth.state';

export class AuthGetterState {

  @Selector([AuthState])
  static getToken(state: AuthStateModel): string {
    return state.token;
  }

  @Selector([AuthState])
  static getIsGuest(state: AuthStateModel): boolean {
    return state.isGuest;
  }
}
