export class UserModel {
  readonly id: number = null;
  authToken: string = null;
  fullName: string = null;
  email: string = null;
  password: string = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
