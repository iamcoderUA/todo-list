const ActionTypes = {
  CHECK_TOKEN_ON_INIT: `[Auth] Check Token On Init`,
  SET_TOKEN: `[Auth] Set Token`,
  CLEAR_TOKEN: `[Auth] Clear Token`,

  LOGIN: '[Auth] Login',
  LOGIN_SUCCESS: '[Auth] Login Success',
  LOGIN_FAIL: '[Auth] Login Fail',

  LOGOUT: `[Auth] Logout`,
  LOGOUT_SUCCESS: '[Auth] Logout Success',
  LOGOUT_FAIL: '[Auth] Logout Fail',

  SIGNUP: '[Auth] SignUp',
  SIGNUP_SUCCESS: '[Auth] SignUp Success',
  SIGNUP_FAIL: '[Auth] SignUp Fail',
};

export class CheckTokenOnInitAction {
  static type = ActionTypes.CHECK_TOKEN_ON_INIT;

  constructor(public payload?: any) {
  }
}
export class SetTokenAction {
  static type = ActionTypes.SET_TOKEN;

  constructor(
    public payload: string,
    public redirectUrl: string[] = ['/private'],
  ) {
  }
}
export class ClearTokenAction {
  static type = ActionTypes.CLEAR_TOKEN;

  constructor(public payload?: string) {
  }
}

export class LoginAction {
  static type = ActionTypes.LOGIN;

  constructor(public payload?: any) {
  }
}
export class LoginSuccessAction {
  static type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload?: any) {
  }
}
export class LoginFailAction {
  static type = ActionTypes.LOGIN_FAIL;

  constructor(public payload?: any) {
  }
}

export class LogoutAction {
  static type = ActionTypes.LOGOUT;

  constructor(public payload?: any) {
  }
}
export class LogoutSuccessAction {
  static type = ActionTypes.LOGOUT_SUCCESS;

  constructor(public payload?: any) {
  }
}
export class LogoutFailAction {
  static type = ActionTypes.LOGOUT_FAIL;

  constructor(public payload?: any) {
  }
}

export class SignupAction {
  static type = ActionTypes.SIGNUP;

  constructor(public payload?: any) {
  }
}
export class SignupSuccessAction {
  static type = ActionTypes.SIGNUP_SUCCESS;

  constructor(public payload?: any) {
  }
}
export class SignupFailAction {
  static type = ActionTypes.SIGNUP_FAIL;

  constructor(public payload?: any) {
  }
}
