import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';

import { LoginRequestAction } from '../requests/auth/login/login-request.actions';

import { SessionService } from '../../core/services/session.service';

import {
  CheckTokenOnInitAction,
  ClearTokenAction,
  LoginAction,
  LoginSuccessAction,
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
    this.sessionService.removeSessionToken();
    this.ngZone.run(() => this.router.navigate(['auth'])).then();
  }

  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    ctx.dispatch(new LoginRequestAction(action.payload));
  }

  @Action(LoginSuccessAction)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccessAction) {
    return ctx.dispatch([
      new SetTokenAction(action.payload['access_token']),
    ]);
  }
}
