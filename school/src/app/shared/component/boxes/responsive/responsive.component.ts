import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css']
})
export class ResponsiveComponent implements OnInit {

  @Input() gap = "50px"
  @Input() colGap = "0px"
  @Input() onlyColumn = false
  
  constructor() { }

  ngOnInit() {    
  }

}
