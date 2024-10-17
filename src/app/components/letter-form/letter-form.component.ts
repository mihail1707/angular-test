import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tree } from 'next/dist/build/templates/app-page';
import { optionsSelect } from 'src/app/models/options-select';
import { userLetter } from 'src/app/models/user-letter';
import { ModalService } from 'src/app/services/modal.service';
import { UsersLettersService } from 'src/app/services/users-letters.service';

@Component({
  selector: 'app-letter-form',
  templateUrl: './letter-form.component.html',
  styleUrls: ['./letter-form.component.scss']
})
export class LetterFormComponent implements OnInit {
  flagName:boolean = true
  flagEmail:boolean = true
  flagTelephone:boolean = true
  flagTheme:boolean = true
  flagMessage:boolean = true
  flagCaptcha:boolean = true
  flagAll:boolean = true
  valueCaptcha:string;
  itemsSelect: optionsSelect[];

  constructor(
    private usersLettersService:UsersLettersService,
    public modalService:ModalService
  ) { 
    this.itemsSelect = [
      {value: 'Техподдержка', code: 'TP'},
      {value: 'Продажи', code: 'P'},
      {value: 'Другое', code: 'D'},
      {value: '', code: '0'}
    ];
    this.valueCaptcha = this.generationCaptcha();
  }

  ngOnInit(): void {
  }
  formContol = new FormGroup({
    name: new FormControl<string>('',[
        Validators.required
      ]
    ),
    telephone:new FormControl<string>('',[
      Validators.required
    ]),
    email: new FormControl<string>('',[
      Validators.required,
      Validators.email
    ]),
    theme:new FormControl<string>('',[
      Validators.required
    ]),
    message: new FormControl<string>('',[
      Validators.required
    ]),
    captcha:new FormControl<string>('',[
      Validators.required
    ])
  })
  generationCaptcha (){
    let strValue = "";
    for(let i = 0; i < 5; i++) strValue += Math.floor(Math.random() * 10);
    return strValue
  }
  get emailValid(){
  
    return this.formContol.controls.email as FormControl
  }
  get nameValid(){
    console.log(this.formContol.controls)
    return this.formContol.controls.name as FormControl
  }
  submitForm(){
    this.flagAll = true;
    const controls = this.formContol.controls;
    // console.log(this.formContol.controls.captcha.value != this.valueCaptcha)
    if(controls.captcha.value != this.valueCaptcha){
      console.log(controls.captcha.value)
      this.valueCaptcha = this.generationCaptcha();
      this.flagCaptcha = false;
      this.flagAll = false;
    } else this.flagCaptcha = true;
    
    
    if(controls.name.status == "INVALID"){
      console.log(controls.name.status == "INVALID","name")
      this.flagName = false;
      this.flagAll = false;
    }else this.flagName = true;

    if(controls.email.status == "INVALID"){
      this.flagEmail = false;
      this.flagAll = false;
    }else this.flagEmail = true;
    
    // console.log(controls.telephone.status)
    if(controls.telephone.status == "INVALID"){
      console.log(controls.telephone.status)
      this.flagTelephone = false;
      this.flagAll = false;
    }else this.flagTelephone = true;

    if(controls.theme.status == "INVALID"){
      this.flagTheme = false;
      this.flagAll = false;
    }else this.flagTheme = true;

    if(controls.message.status == "INVALID"){
      this.flagMessage = false;
      this.flagAll = false;
    }else this.flagMessage = true;

    console.log(controls)
    if(!this.flagAll) return;
    this.usersLettersService.create(
      {
        name: this.formContol.value.name as string,
        email:this.formContol.value.email as string,
        telephone:this.formContol.value.telephone as string,
        theme:this.formContol.value.theme as string,
        message:this.formContol.value.message as string
      } as userLetter
      ).subscribe((result)=>{
        console.log(result,"subscribe")
        this.modalService.close();
      })
    }
}
