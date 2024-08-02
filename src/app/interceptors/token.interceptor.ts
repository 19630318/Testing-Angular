import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { TokenService } from '../services/token.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

export const TokenInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenService = inject(TokenService);

  if (request.context.get(CHECK_TOKEN)) {
    const token = tokenService.getToken();
    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next(authReq);
    }
    return next(request);
  }
  return next(request);
};
