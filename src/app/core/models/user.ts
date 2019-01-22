export class UserModel {
  readonly _id: string = null;
  authToken?: string = null;
  name: string = null;
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
