import { State } from '@ngxs/store';

import { IRequestsNestedState } from '../../requests.interface';

export interface UserRequestStateModel extends IRequestsNestedState {
}

@State<UserRequestStateModel>({
  name: 'UserRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})

export class UserRequestState {
}
