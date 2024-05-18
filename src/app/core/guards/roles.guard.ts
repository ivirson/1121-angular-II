import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';

export const rolesGuard: CanActivateFn = (activatedRoute) => {
  return inject(AuthService)
    .checkUserRoles()
    .pipe(
      map((userRole) => {
        const userCanDo = activatedRoute.data['roles'].includes(userRole);
        return userCanDo
          ? true
          : createUrlTreeFromSnapshot(activatedRoute, ['/', 'auth', 'login']);
      })
    );
};
