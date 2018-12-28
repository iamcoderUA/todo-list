export class LogoutRequestAction {
  static type = '[Requests] Logout';

  constructor(public payload: any) {
  }
}

export class LogoutRequestSuccessAction {
  static type = '[Requests] Logout Success';

  constructor(public payload: any) {
  }
}

export class LogoutRequestFailAction {
  static type = '[Requests] Logout Fail';

  constructor(public payload: any) {
  }
}

