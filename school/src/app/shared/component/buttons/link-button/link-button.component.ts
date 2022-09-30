import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.css']
})
export class LinkButtonComponent implements OnInit {
  @Input() title
  @Input() icon

  constructor() { }

  ngOnInit(): void {
  }

}
