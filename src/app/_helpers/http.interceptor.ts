import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('userTk');

    if (token) {

      let apiKey = `Bearer ${token}`

      request = request.clone({
        setHeaders: {
          'Authorization': apiKey,
        }
      })

      return next.handle(request);

    }

    return next.handle(request);

  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
];
