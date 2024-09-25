import { Component, inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private usersServices = inject(UsersService);

  users: any[] = [];

  async ngOnInit() {
   const response = await this.usersServices.allUsers();
   console.log(response);
   this.users = response;
  }

  
}
