import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public slides
  constructor() {}

  ngOnInit(): void {
    this.slides = [
      {
        image: "assets/images/bg_1.jpg"
      },
      {
        image: "assets/images/bg_2.jpg"
      },
      {
        image: "assets/images/bg_3.jpg"
      },
      {
        image: "assets/images/bg_4.jpg"
      }
    ]
  }
}
