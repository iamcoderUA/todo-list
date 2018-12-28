import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';

import { LoginRequestAction } from '../requests/auth/login/login-request.actions';
import { LogoutRequestAction } from '../requests/auth/logout/logout-request.actions';

import { SessionService } from '../../core/services/session.service';

import {
CheckTokenOnInitAction,
ClearTokenAction,
LoginAction,
LoginSuccessAction,
LogoutAction,
LogoutSuccessAction,
SetTokenAction,
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
    private store: Store,
    private router: Router,
    private ngZone: NgZone,
    private sessionService: SessionService,
  ) {
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new CheckTokenOnInitAction());
  }

  @Action(CheckTokenOnInitAction)
  checkToken(ctx: StateContext<AuthStateModel>, action: CheckTokenOnInitAction) {
    const token = this.sessionService.getSessionToken();
    ctx.dispatch(token ? new SetTokenAction(token) : new ClearTokenAction());
  }

  @Action(SetTokenAction)
  setToken(ctx: StateContext<AuthStateModel>, action: SetTokenAction) {
    ctx.patchState({
      token: action.payload,
      isGuest: false,
    });
    this.sessionService.setSessionToken(action.payload);
    this.ngZone.run(() => this.router.navigate(['todo-items'])).then();
  }

  @Action(ClearTokenAction)
  clearToken(ctx: StateContext<AuthStateModel>, action: ClearTokenAction) {
    ctx.patchState({
      token: null,
      isGuest: true,
    });
    if (action.payload) { this.sessionService.removeSessionToken(); }
  }

  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    return ctx.dispatch(new LoginRequestAction(action.payload));
  }

  @Action(LoginSuccessAction)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccessAction) {
    return ctx.dispatch([
      new SetTokenAction(action.payload['access_token']),
    ]);
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>, action: LogoutAction) {
    ctx.dispatch(new LogoutRequestAction(action.payload));
  }

  @Action(LogoutSuccessAction)
  logoutSuccess(ctx: StateContext<AuthStateModel>, action: LogoutSuccessAction) {
    this.ngZone.run(() => this.router.navigate(['auth'])).then();
    ctx.dispatch(new ClearTokenAction(action.payload));
  }
}
