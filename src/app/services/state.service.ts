import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private idUser: string = "";
  private idSubject:BehaviorSubject<string> = new BehaviorSubject<string>(this.idUser);

  setIdUser(idUser: string){
    this.idUser = idUser;
    this.idSubject.next(this.idUser);
  }

  getIdUser(){
    return this.idSubject.asObservable();
  }
}
