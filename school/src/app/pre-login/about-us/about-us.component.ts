import { Component, OnInit } from '@angular/core';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public slides
  public masterData = MasterData

  constructor() { }

  ngOnInit(): void {
    this.slides = [
      {
        image: "assets/images/bg_aboutUs.jpg"
      },
      {
        image: "assets/images/bg_aboutUs2.jpg"
      }
    ]
  }

}
