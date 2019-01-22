import { Selector } from '@ngxs/store';

import { MeRequestStateModel } from './me-request.state';

export class MeRequestGetterState {

  @Selector()
  static getMeRequestState(state: MeRequestStateModel): MeRequestStateModel {
    return state;
  }

}
