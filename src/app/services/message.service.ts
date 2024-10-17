import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message$ = new Subject<string>()
  flagMassege:boolean // error = false, success = true
  constructor() { }
  open(message:string){
    this.message$.next(message);
  }
  clear(){
    this.message$.next('');
  }
  setFlag( value:boolean ){
    this.flagMassege = value;
  }
  get getFlag(){
    return this.flagMassege;
  }
}
