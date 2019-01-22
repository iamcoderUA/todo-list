import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';

import { LoginRequestAction } from '../requests/auth/login/login-request.actions';
import { LogoutRequestAction } from '../requests/auth/logout/logout-request.actions';

import { SessionService } from '../../core/services/session.service';

import { ClearSelfDataAction, LoadSelfDataAction } from '../user/user.actions';

import {
  CheckTokenOnInitAction,
  ClearTokenAction,
  LoginAction,
  LoginSuccessAction,
  LogoutAction,
  LogoutSuccessAction,
  SetTokenAction,
  SetUserAsLoginedAction,
} from './auth.actions';


export interface AuthStateModel {
  isGuest: boolean;
  token: string;
}


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isGuest: null,
    token: null,
  },
})
export class AuthState implements NgxsOnInit {

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private store: Store,
    private sessionService: SessionService,
  ) {
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new CheckTokenOnInitAction());
  }

  @Action(CheckTokenOnInitAction)
  checkToken(ctx: StateContext<AuthStateModel>, action: CheckTokenOnInitAction) {
    const authToken = this.sessionService.getSessionToken();
    ctx.dispatch(authToken ? new SetUserAsLoginedAction({authToken}) : new ClearTokenAction());
  }

  @Action(SetTokenAction)
  setToken(ctx: StateContext<AuthStateModel>, action: SetTokenAction) {
    ctx.patchState({
      token: action.payload,
      isGuest: false,
    });
    this.sessionService.setSessionToken(action.payload);
  }

  @Action(ClearTokenAction)
  clearToken(ctx: StateContext<AuthStateModel>, action: ClearTokenAction) {
    ctx.patchState({
      token: null,
      isGuest: true,
    });
    if (action.payload) { this.sessionService.removeSessionToken(); }
  }

  @Action(SetUserAsLoginedAction)
  setUserAsLogined(ctx: StateContext<AuthStateModel>, action: SetUserAsLoginedAction) {
    ctx.dispatch([
      new LoadSelfDataAction(),
      new SetTokenAction(action.payload.authToken),
    ]);
  }

  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    ctx.dispatch(new LoginRequestAction(action.payload));
  }

  @Action(LoginSuccessAction)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccessAction) {
    ctx.dispatch(new SetUserAsLoginedAction(action.payload));
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>, action: LogoutAction) {
    ctx.dispatch(new LogoutRequestAction(action.payload));
  }

  @Action(LogoutSuccessAction)
  logoutSuccess(ctx: StateContext<AuthStateModel>, action: LogoutSuccessAction) {
    ctx.dispatch([
      new ClearTokenAction(action.payload.logout),
      new ClearSelfDataAction(),
    ]);
    this.ngZone.run(() => this.router.navigate(['auth'])).then();
  }
}
