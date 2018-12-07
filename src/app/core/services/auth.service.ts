import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Select, Store } from '@ngxs/store';

import { LoginAction } from '../../ngxs/auth/auth.actions';

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
    private router: Router,
  ) {
  }

  login(userData) {
    this.store.dispatch(new LoginAction(userData));
  }

  loginRequest(userData) {
    return this.httpClient.post<string>('auth/login', userData);
  }

  signUp(userData) {
  }

  getAuthUser() {
    return this.httpClient.get<UserModel>('auth/user');
  }
}
