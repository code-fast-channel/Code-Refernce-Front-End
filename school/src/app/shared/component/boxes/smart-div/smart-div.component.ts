import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'smart-div',
  templateUrl: './smart-div.component.html',
  styleUrls: ['./smart-div.component.css']
})
export class SmartDivComponent implements OnInit {

  @Input() form: FormGroup
  @Input() highlighPass = false
  @Input() icon:string
  @Input() badge: string|number = null
  @Input() isFormStatus = false
  
  constructor() { }

  ngOnInit() {
  }

}
