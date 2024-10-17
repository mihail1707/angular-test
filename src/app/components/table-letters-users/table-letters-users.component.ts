import { Component, OnInit } from '@angular/core';
import { userLetter } from 'src/app/models/user-letter';
import { UsersLettersService } from 'src/app/services/users-letters.service';

@Component({
  selector: 'app-table-letters-users',
  templateUrl: './table-letters-users.component.html',
  styleUrls: ['./table-letters-users.component.scss']
})
export class TableLettersUsersComponent implements OnInit {
  dataArray:userLetter[]=[]
  constructor( public usersLettersService:UsersLettersService,) { }
//   dataArray = [
//     {
//         name: 'John Doe',
//         email: 'john@example.com',
//         telephone: '123-456-7890',
//         theme: 'Inquiry',
//         message: 'Hello, I have a question.'
//     },
//     {
//         name: 'Jane Smith',
//         email: 'jane@example.com',
//         telephone: '098-765-4321',
//         theme: 'Feedback',
//         message: 'Great service!'
//     }
//     // Добавьте больше объектов по необходимости
// ];
  ngOnInit(): void {
    this.usersLettersService.read().subscribe((resulte)=>{
      console.log(resulte)
      this.dataArray = resulte
    })
  }

}
