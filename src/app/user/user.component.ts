import { Component, inject, Input } from '@angular/core';
import { StateService } from '../services/state.service';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface response {
  email: string,
  name: string,
  roles: string[],
  createdAt: string,
  id: string,
  password: string,
  updatedAt: string
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  subscription: Subscription = new Subscription();
  idUser$!:string
  currentUser!: response

  constructor(private readonly stateService: StateService, 
              private readonly usersService: UsersService,
              ){
  }

  async ngOnInit() {
    try {
      const storedIduser = localStorage.getItem('idUser')
      if(storedIduser){
        this.idUser$ = storedIduser
      }else{
        this.showInfo(); 
      }; 
      this.currentUser = await this.getDataUser(this.idUser$);
      console.log(this.currentUser);
    } catch (error) {
      this.usersService.sendBack();
    }
    
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();   
   localStorage.removeItem('idUser')
  }

  showInfo(){
    const sub = this.stateService.getIdUser().subscribe(
      val => {
        localStorage.setItem('idUser', val); // Saving Id localstorage
        this.idUser$ = val; // Updating the variable
        console.log('ID got from services and saved in localStorage:', val);
      }
    )
    this.subscription.add(sub);
  }

  async getDataUser(idUser: string): Promise<response>{
    return await this.usersService.getOneUser(idUser);
  }

  logOut(){
    this.usersService.logOut();
  }

}
