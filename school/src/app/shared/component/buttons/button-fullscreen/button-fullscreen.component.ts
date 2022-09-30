import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-fullscreen',
  templateUrl: './button-fullscreen.component.html',
  styleUrls: ['./button-fullscreen.component.css']
})
export class ButtonFullscreenComponent implements OnInit {

  screen = screen
  window = window

  constructor() { }

  ngOnInit() {
  }

  OpenWholeAppFullScreen(value) {

    var elem = document.documentElement;

    try {
      if (window.innerWidth == screen.width && window.innerHeight == screen.height) {
        document.exitFullscreen();
      } else {
        elem.requestFullscreen();
      }
    }
    catch (ex) { }

  }
}
