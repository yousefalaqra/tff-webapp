import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = localStorage.getItem('access_token')

    // Clone the request and set the new header in one step.
    if (accessToken) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          authorization: `Bearer ${accessToken}`,
        }),
      });
      return next.handle(authReq).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              localStorage.removeItem('access_token')
              this._router.navigate(['/login'])
              return new Observable<HttpEvent<any>>();
            } else {
              return throwError(err);
            }
          } else {
            return of(err);
          }
        })
      );
    }

    return next.handle(req);
  }
}
