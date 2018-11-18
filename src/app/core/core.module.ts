import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTOR_PROVIDERS } from './interceptors';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS
  ],
})
export class CoreModule {
}
