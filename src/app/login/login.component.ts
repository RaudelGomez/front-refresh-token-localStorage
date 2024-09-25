import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';

export interface LoginResponse {
  access_token: string;
  refresh_token: string; 
  message: string;
  name: string;  
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private readonly usersService: UsersService){}
  user = {
    email: "",
    password: ""
  }

  async logUser(){
    try {
      let resp: any =  await this.usersService.loginUser(this.user);
      // this.user.email = "";
      // this.user.password = "";
      console.log(resp);

      if(resp['access_token']){
        localStorage.setItem('token', resp.access_token);
        localStorage.setItem('refreshToken', resp.refresh_token);
      }
      return resp;
    } catch (error) {
      console.log(error);
      return {message: 'Failed'}
    }
  }
}
