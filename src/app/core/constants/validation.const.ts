import { InjectionToken } from '@angular/core';

export const VALIDATION = new InjectionToken<any>('validation');

export const VALIDATION_VALUE = {
  email: {
    pattern: /^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
  },
  password: {
    pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[~\\\/"[\]`!@#$%^&*()=+{}|:;,.<>?_-]).+$/,
    minlength: 8,
  },
  fullName: {
    maxlength: 60,
    minlength: 3,
  },
  phone: {
    pattern: /^[0-9]+$/,
    maxlength: 14,
    minlength: 4,
  },
};
