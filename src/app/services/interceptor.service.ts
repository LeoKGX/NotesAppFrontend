import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { loginService } from './login.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const InterceptorService: HttpInterceptorFn = (req, next) => {
  const loginSvc = inject(loginService);
  const router = inject(Router);

  const user = loginSvc.usuarioAutenticado;

  if (user?.accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.accessToken}`
      }
    });
  }

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        loginSvc.logout();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
