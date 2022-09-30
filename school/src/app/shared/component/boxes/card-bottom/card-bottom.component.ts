import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'card-bottom',
  templateUrl: './card-bottom.component.html',
  styleUrls: ['./card-bottom.component.css']
})
export class CardBottomComponent implements OnInit {

  @Input() form: FormGroup
  @Input() defaultButton = true
  @Input() title = "Search"
  @Input() icon = "search"
  @Input() showOnlyBottomButton = true
  @Input() open = false
 
  public isFormHasData

  constructor() {}

  ngOnInit(): void {
  }

  show(){
    this.open = true
  }

  hide(){
    this.open = false
    this.isFormHasData = false
    this.checkFormData(this.form)
  }

  checkFormData(mainForm: FormGroup | FormArray) {

    Object.keys(mainForm.controls).forEach(key => {

      let control = mainForm.get(key)

      if (control instanceof FormControl) {
        let data = mainForm.get(key).value
        if(data === "" || data === undefined || data === null){
          // data != "" && data != undefined && data != null, not working properly
        }
        else{          
          this.isFormHasData = true
        }
      }
      if (control instanceof FormGroup) {
        this.checkFormData(control)
      }
      if (control instanceof FormArray) {
        this.checkFormData(control)
      }
    })
  }
}
