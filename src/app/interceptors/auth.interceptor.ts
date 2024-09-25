import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const usersServices = inject(UsersService);
  const token = usersServices.getAuthToken();

  const authReq = req.clone({
    setHeaders: {
      authorization: token
    }
  })

  return next(authReq).pipe(
    //If there is a error will happend the line below
    catchError((err)=>{
      return usersServices.refreshToken().pipe(
        switchMap((res)=>{
          //save new Token
          console.log('nuevo token', res);
          localStorage.setItem('token', res.new_access_token);

          //Clone again the req to send in the headers the new access_token
          const newReq = req.clone({
            setHeaders: {
              authorization: res.new_access_token
            }
          });

          //Make next with the new req and new access_token
          return next(newReq);
        }),
        catchError((refreshError)=>{
          const finalError = new Error(refreshError);

          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          return throwError(()=> finalError)
        })
      )
    })
  );
};
