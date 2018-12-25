import { Injectable } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  constructor(
    private cookieService: CookieService,
  ) {
  }

  getSessionToken() {
    return this.cookieService.get('token');
  }

  setSessionToken(TodoItemsToken: string) {
    return this.cookieService.put('token', TodoItemsToken);
  }

  removeSessionToken() {
    return this.cookieService.remove('token');
  }
}
