import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class ROWComponent implements OnInit {

  @Input() gap = "50px"

  constructor() { }

  ngOnInit() {
  }

}
