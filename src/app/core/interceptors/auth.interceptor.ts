import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Constants } from '../../commons/constants/constants.enum';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  if (req.url.includes('/auth')) {
    return next(req);
  }

  const token = localStorage.getItem(Constants.TOKEN_KEY) || '';

  if (!token) {
    return next(req);
  }

  const newReq = req.clone({
    setHeaders: {
      Authorization: token,
    },
  });

  return next(newReq).pipe(
    catchError((err: any) => {
      if (err.status === 401 || err.status === 403) {
        console.error(err.error.message);
        router.navigate(['auth', 'login']);
      }

      // TO DO implementar redirect
      return throwError(() => err);
    })
  );
};
