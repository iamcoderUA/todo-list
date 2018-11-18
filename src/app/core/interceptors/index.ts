import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './api-url.interceptor';

/** Http interceptor providers in outside-in order */
export const HTTP_INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
];
