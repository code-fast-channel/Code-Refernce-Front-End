import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public slides

  constructor() { }

  ngOnInit(): void {
    this.slides = [
      {
        image: "assets/images/gallery.jpg"
      },
      {
        image: "assets/images/gallery2.jpg"
      }
    ]
  }

}
