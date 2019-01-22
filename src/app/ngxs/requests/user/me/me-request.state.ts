import { Action, State, StateContext } from '@ngxs/store';

import { catchError, switchMap } from 'rxjs/operators';

import { UserService } from '../../../../core/services/user.service';
import { IRequestsNestedState } from '../../requests.interface';

import { LoadSelfDataFailAction, LoadSelfDataSuccessAction } from '../../../user/user.actions';

import {
  MeRequestAction,
  MeRequestFailAction,
  MeRequestSuccessAction,
} from './me-request.actions';


export interface MeRequestStateModel extends IRequestsNestedState {
}

@State<MeRequestStateModel>({
  name: 'meRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
export class MeRequestState {

  constructor(
    private userService: UserService,
  ) {
  }

  @Action(MeRequestAction)
  meRequest(ctx: StateContext<MeRequestStateModel>, action: MeRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.userService.getAuthUser().pipe(
      switchMap(res => ctx.dispatch(new MeRequestSuccessAction(res))),
      catchError(error => ctx.dispatch(new MeRequestFailAction(error))),
    );
  }

  @Action(MeRequestSuccessAction)
  meRequestSuccess(
    ctx: StateContext<MeRequestStateModel>,
    action: MeRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload.data,
    });
    ctx.dispatch(new LoadSelfDataSuccessAction(action.payload.data));
  }

  @Action(MeRequestFailAction)
  meRequestFail(ctx: StateContext<MeRequestStateModel>, action: MeRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadSelfDataFailAction(action.payload));
  }
}
