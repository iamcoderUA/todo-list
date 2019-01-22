export class MeRequestAction {
  static type = '[Requests] Me';

  constructor(public payload?: any) {
  }
}

export class MeRequestSuccessAction {
  static type = '[Requests] Me Success';

  constructor(public payload: any) {
  }
}

export class MeRequestFailAction {
  static type = '[Requests] Me Fail';

  constructor(public payload: any) {
  }
}