import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css']
})
export class FieldsetComponent implements OnInit {

  @Input('icon') icon = null
  @Input('title') title = '';
  
  constructor() { }

  ngOnInit() {
  }

}
