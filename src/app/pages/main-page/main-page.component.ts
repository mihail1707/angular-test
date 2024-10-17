import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UsersLettersService } from 'src/app/services/users-letters.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    public usersLettersService:UsersLettersService,
    public modalService:ModalService
  ) { }

  ngOnInit(): void {
    // this.usersLettersService.read().subscribe((resulte)=>{
    //   console.log(resulte)
    // })
  }

}
