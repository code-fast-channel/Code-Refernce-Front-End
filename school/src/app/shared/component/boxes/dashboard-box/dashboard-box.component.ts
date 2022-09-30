import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dashboard-box',
  templateUrl: './dashboard-box.component.html',
  styleUrls: ['./dashboard-box.component.css']
})
export class DashboardBoxComponent implements OnInit {

  @Input() icon
  @Input() title = ""
  @Input() value = ""
  @Input() bgImage = ""
  @Input() bgColor = ""
  @Input() color = ""
  @Input() pinned = false
  @Input() fullScreen = false
  @Input() open = true
  
  constructor( ) { }

  ngOnInit() {
  }

}
