import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authToken$: Observable<string>;
  isGuest$: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  login(userData) {
    return this.httpClient.post<UserModel>('auth/login', userData);
  }

  signUp(userData) {
  }

  getAuthUser() {
    return this.httpClient.get<UserModel>('auth/user');
  }
}
