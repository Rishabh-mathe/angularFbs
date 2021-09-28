import { HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const TOKEN_HEADER_KEY = 'auth-token';
    const token = window.sessionStorage.getItem(TOKEN_HEADER_KEY);
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set("Authorization", 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}
