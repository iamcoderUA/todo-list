import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UserRequestGetterState } from '../../ngxs/requests/user/user/user-request-getter.state';
import { UserGetterState } from '../../ngxs/user';

import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Select(UserGetterState.getSelfData)
  selfData$: Observable<UserModel>;

  @Select(UserRequestGetterState.getUserIsLoaded)
  selectedUserIsLoaded$: Observable<boolean>;

  constructor(
    private store: Store,
    private httpClient: HttpClient,
  ) {
  }

  getAuthUser() {
    return this.httpClient.get<UserModel>(`auth/user`);
  }
}
