import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginResponse } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:3000/api/v1';

  private httpClient = inject(HttpClient);

  async registerUser(user: any){
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/users/register`, user));
  }

  async loginUser(user: any){
    return firstValueFrom(this.httpClient.post<LoginResponse>(`${this.baseUrl}/users/login`, user));
  }

  async allUsers(){
    return firstValueFrom(this.httpClient.get<any[]>(`${this.baseUrl}/users/all`))
  }

  refreshToken(){
    const refresh_token = this.getrefreshToken();
    return this.httpClient.post<any>(`${this.baseUrl}/users/refresh`, {refresh_token});
  }

  getAuthToken(){
    return localStorage.getItem('token') || '';
  }

  getrefreshToken(){
    return localStorage.getItem('refreshToken') || '';
  }

}
