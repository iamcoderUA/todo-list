import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Select, Store } from '@ngxs/store';

import { LoginAction, LogoutAction } from '../../ngxs/auth/auth.actions';

import { AuthGetterState } from '../../ngxs/auth';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  @Select(AuthGetterState.getToken) authToken$: Observable<string>;
  isGuest$: Observable<boolean> = this.store.select(state => state.auth.isGuest).pipe(
    filter(isGuest => isGuest !== null),
  );

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {
  }

  login(userData) {
    this.store.dispatch(new LoginAction(userData));
  }

  loginRequest(userData) {
    return this.httpClient.post<string>('auth/login', userData);
  }

  logout() {
    this.store.dispatch(new LogoutAction({logout: true}));
  }

  logoutRequest(value: {logout: boolean}) {
    return this.httpClient.post<{logout: boolean}>('auth/logout', value);
  }

  signUp(userData) {
  }

  getAuthUser() {
    return this.httpClient.get<UserModel>('auth/user');
  }
}
