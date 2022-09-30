import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit {

  @Input() boxSize = 'small'
  @Input() title: string
  @Input() isSettings= false
  @Input() isNotification = false

  constructor() {
    
   }

  ngOnInit() {
  }

}
