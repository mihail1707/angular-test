import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  @Input() title:string
  constructor(public modalService:ModalService ) { }

  ngOnInit(): void {
  }

}
