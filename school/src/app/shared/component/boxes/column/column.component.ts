import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() gap = "50px"
  
  constructor() { }

  ngOnInit() {
  }

}
