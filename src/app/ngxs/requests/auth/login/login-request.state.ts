import { Action, State, StateContext, Store  } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthService } from '../../../../core/services/auth.service';

import { IRequestsNestedState } from '../../requests.interface';

import { LoginFailAction, LoginSuccessAction } from '../../../auth/auth.actions';

import {
  LoginRequestAction,
  LoginRequestFailAction,
  LoginRequestSuccessAction,
} from './login-request.actions';


export interface LoginStateModel extends IRequestsNestedState {
}

@State<LoginStateModel>({
  name: 'loginRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
export class LoginRequestState {

  constructor(
    private store: Store,
    private authService: AuthService,
  ) {
  }

  @Action(LoginRequestAction)
  loginRequest(ctx: StateContext<LoginStateModel>, action: LoginRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.authService.loginRequest(action.payload).pipe(
      switchMap(token => ctx.dispatch(new LoginRequestSuccessAction(token))),
      catchError(err => ctx.dispatch(new LoginRequestFailAction(err))),
    );
  }

  @Action(LoginRequestSuccessAction)
  loginRequestSuccess(ctx: StateContext<LoginStateModel>, action: LoginRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoginSuccessAction(action.payload));
  }

  @Action(LoginRequestFailAction)
  loginRequestFail(ctx: StateContext<LoginStateModel>, action: LoginRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoginFailAction(action.payload));
  }
}
