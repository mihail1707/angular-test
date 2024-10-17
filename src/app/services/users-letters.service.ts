import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams,HttpHeaders} from "@angular/common/http"
import { userLetter } from '../models/user-letter';
// import { ErrorService } from './message.service';
import { catchError, delay, Observable, retry, tap, throwError } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UsersLettersService {
  userLettersArr:userLetter[]=[];
  private apiUrl = 'http://localhost:3000/users';
  // private apiUrl = 'https://fakestoreapi.com/products';
  constructor(
        private http:HttpClient,
        private messageService:MessageService
        // private messageService: MessageService
  ) { }
  read():Observable<userLetter[]>{
    return this.http.get<userLetter[]>(this.apiUrl,{
        params:new HttpParams({
            fromObject:{'limit':'25'}
            
        })
    }).pipe(
        delay(10),
        retry(1),// запросить 1 раза
        tap((el: userLetter[])  => {
          console.log(el); 
          // this.successMessage("успешное сохранение");
          return this.userLettersArr = el
        }),
        catchError(this.errorHandler.bind(this))
    );
  }
  private errorHandler(error:HttpErrorResponse){
      this.messageService.open(error.message);
      this.messageService.setFlag(false);
      return throwError(()=>error.message);
  }
  private successMessage(success:string){
    this.messageService.setFlag(true);
    this.messageService.open(success)
    return success;
  }
  create(user:userLetter):Observable<userLetter>{
      return this.http.post<userLetter>(this.apiUrl,user)
      .pipe(
          tap(el  => {
            console.log(el,"create"); 
            this.successMessage("успешное сохранение");
            this.userLettersArr.push(el)
          }),
          catchError(this.errorHandler.bind(this))
      )
  }
}
