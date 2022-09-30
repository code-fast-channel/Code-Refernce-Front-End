import { Component, OnInit, Input } from '@angular/core';
import { Validator } from '../field.interface';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() validation: Validator
  @Input() lable: string

  constructor() { }

  ngOnInit() {
    this.setErrorMessageText()
  }

  setErrorMessageText(){

    if(this.validation.errorMessage){
      return // if your already given error message text
    }

    if(!this.lable){
      this.lable = 'This field'
    }
    
    switch(this.validation.name)
    {
      case 'required':{
        this.validation.errorMessage = "'" + this.lable + "'" + " is required."
        break
      }
      case 'minlength':{
        this.validation.errorMessage = "'" + this.lable + "'" + " should be of minimum length " + this.validation.value +"."
        break
      }
      case 'maxlength':{
        this.validation.errorMessage = "'" + this.lable + "'" + " should be of maximum length " + this.validation.value +"."
        break
      }
      case 'pattern':{
        this.validation.errorMessage = "'" + this.lable + "'" + " is invalid."
        break
      }
    }
  }

}
