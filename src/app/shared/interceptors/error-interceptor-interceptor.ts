import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorHandler } from '../services/error-handler/error-handler';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errHandler = inject(ErrorHandler);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      errHandler.handleError(err);
      return throwError(() => err);
    })
  );
};
