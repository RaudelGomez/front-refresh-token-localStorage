import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private readonly usersService: UsersService){}
  user = {
    name: "",
    email: "",
    password: ""
  }

  async saveUser(){
    try {
      let resp =  await this.usersService.registerUser(this.user);
      this.user.name = "";
      this.user.email = "";
      this.user.password = "";
      console.log(resp);
      return resp;
    } catch (error) {
      console.log(error);
      return {message: 'Fail'}
    }
  }
}
