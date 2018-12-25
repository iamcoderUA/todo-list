import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Error } from 'tslint/lib/error';

import { CookieService } from 'angular2-cookie/core';

import { NgxsStoreModule } from '../ngxs/ngxs.module';

import { HTTP_INTERCEPTOR_PROVIDERS } from './interceptors';
import { LoaderModule } from './loader/loader.module';

import { VALIDATION, VALIDATION_VALUE } from './constants/validation.const';

@NgModule({
  imports: [
    HttpClientModule,
    NgxsStoreModule,
    LoaderModule,
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS,
    {
      provide: VALIDATION,
      useValue: VALIDATION_VALUE,
    },
    CookieService,
  ],
  exports: [
    LoaderModule,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
