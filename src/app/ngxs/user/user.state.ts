import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Action, State, StateContext} from '@ngxs/store';

import { UserModel } from '../../core/models/user';

import { ClearTokenAction } from '../auth/auth.actions';
import { MeRequestAction } from '../requests/user/me/me-request.actions';

import {
  ClearSelfDataAction,
  LoadSelfDataAction,
  LoadSelfDataFailAction,
  LoadSelfDataSuccessAction,
  SetSelfDataAction,
} from './user.actions';


export interface UserStateModel {
  entities: any;
  ids: string[];
  selfDataId: string;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    entities: {},
    ids: [],
    selfDataId: null,
  },
})
export class UserState {

  constructor(
    private ngZone: NgZone,
    private router: Router,
  ) {
  }

  @Action(SetSelfDataAction)
  setSelfData(ctx: StateContext<UserStateModel>, action: SetSelfDataAction) {
    const user = new UserModel(action.payload);
    ctx.patchState({
      selfDataId: user._id,
      entities: {
        ...ctx.getState().entities,
        [user._id]: user,
      },
      ids: [
        ...ctx.getState().ids,
        user._id,
      ],
    });
  }

  @Action(ClearSelfDataAction)
  clearSelfData(ctx: StateContext<UserStateModel>, action: ClearSelfDataAction) {
    ctx.patchState({
      selfDataId: null,
    });
    ctx.dispatch(new SetSelfDataAction(null));
  }

  @Action(LoadSelfDataAction)
  loadSelfData(ctx: StateContext<UserStateModel>, action: LoadSelfDataAction) {
    ctx.dispatch(new MeRequestAction());
  }

  @Action(LoadSelfDataSuccessAction)
  loadSelfDataSuccess(ctx: StateContext<UserStateModel>, action: LoadSelfDataSuccessAction) {
    const selfData = new UserModel(action.payload);
    ctx.dispatch(new SetSelfDataAction(selfData));
    this.ngZone.run(() => this.router.navigate(['todo-items'])).then();
  }

  @Action(LoadSelfDataFailAction)
  loadSelfDataFail(ctx: StateContext<UserStateModel>, action: LoadSelfDataFailAction) {
    ctx.dispatch(new ClearTokenAction(true));
  }
}
