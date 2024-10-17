import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.scss']
})
export class GlobalErrorComponent implements OnInit {
  // flag:boolean;
  constructor(public messageService:MessageService) { }

  ngOnInit(): void {
    // console.log(this.messageService.getFlag())
  }
  // get flag(){
  //   return messageService.flag()|async
  // }
}
