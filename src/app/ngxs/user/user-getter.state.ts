import { Selector } from '@ngxs/store';

import { UserState, UserStateModel } from './user.state';

export class UserGetterState {

  @Selector([UserState])
  static getSelfData(state: UserStateModel): string {
    return state.entities[state.selfDataId];
  }
}
