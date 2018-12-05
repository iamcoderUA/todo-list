import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTOR_PROVIDERS } from './interceptors';

import { VALIDATION, VALIDATION_VALUE } from './constants/validation.const';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS,
    {
      provide: VALIDATION,
      useValue: VALIDATION_VALUE,
    },
  ],
})
export class CoreModule {
}
