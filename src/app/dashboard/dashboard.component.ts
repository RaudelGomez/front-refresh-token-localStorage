import { Component, inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private usersServices = inject(UsersService);
  private stateService = inject(StateService);

  users: any[] = [];

  constructor(){
    if(!localStorage.getItem('token')){
      this.usersServices.sendBack();
     }
  }

  async ngOnInit() {
   const response = await this.usersServices.allUsers();
   console.log(response);
   this.users = response;
  }

  sendIdUser(idUser: string){
    this.stateService.setIdUser(idUser);
  }

  logOut(){
    this.usersServices.logOut();
  }

  

  

  
}
