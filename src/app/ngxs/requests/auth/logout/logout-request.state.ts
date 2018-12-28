import { Action, State, StateContext, Store  } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthService } from '../../../../core/services/auth.service';

import { IRequestsNestedState } from '../../requests.interface';

import { LogoutFailAction, LogoutSuccessAction } from '../../../auth/auth.actions';

import {
  LogoutRequestAction,
  LogoutRequestFailAction,
  LogoutRequestSuccessAction,
} from './logout-request.actions';


export interface LogoutStateModel extends IRequestsNestedState {
}

@State<LogoutStateModel>({
  name: 'logoutRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
export class LogoutRequestState {

  constructor(
    private store: Store,
    private authService: AuthService,
  ) {
  }

  @Action(LogoutRequestAction)
  logoutRequest(ctx: StateContext<LogoutStateModel>, action: LogoutRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.authService.logoutRequest(action.payload).pipe(
      switchMap(status => ctx.dispatch(new LogoutRequestSuccessAction(status))),
      catchError(err => ctx.dispatch(new LogoutRequestFailAction(err))),
    );
  }

  @Action(LogoutRequestSuccessAction)
  logoutRequestSuccess(ctx: StateContext<LogoutStateModel>, action: LogoutRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LogoutSuccessAction(action.payload));
  }

  @Action(LogoutRequestFailAction)
  logoutRequestFail(ctx: StateContext<LogoutStateModel>, action: LogoutRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LogoutFailAction(action.payload));
  }
}
