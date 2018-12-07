import { Injectable} from '@angular/core';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

import { AuthState } from '../../ngxs/auth';

import { AuthService } from '../services/auth.service';

import { environment } from '../../../environments/environment';


@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private store: Store,
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot<string>(state => state.auth.token);
    const apiUrl = req.clone({
      url: req.url.replace('', `${environment.apiUrl}`),
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next.handle(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later');
  }
}
