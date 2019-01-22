import { Selector } from '@ngxs/store';

import { UserRequestState, UserRequestStateModel } from './user-request.state';

export class UserRequestGetterState {

  @Selector([
    UserRequestState,
  ])
  static getUserIsLoaded(state: UserRequestStateModel): boolean {
    return state.loaded;
  }
}
