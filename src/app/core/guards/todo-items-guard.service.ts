import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class TodoItemsGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.authService.isGuest$.pipe(
      map(isGuest => {
        if (isGuest) { this.router.navigate(['auth']); }
        return !isGuest;
      }),
      take(1)
    );
  }
}
