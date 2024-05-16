import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';

export const authGuard: CanActivateFn = (activatedRoute) => {
  return inject(AuthService)
    .checkAuthStatus()
    .pipe(
      map((isLoggedIn) => {
        return isLoggedIn
          ? true
          : createUrlTreeFromSnapshot(activatedRoute, ['/', 'auth', 'login']);
      })
    );
};
