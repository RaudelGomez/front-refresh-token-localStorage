import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const usersSrvices = inject(UsersService);

  const token = usersSrvices.getAuthToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: token
    }
  })
  
  return next(authReq);
};
