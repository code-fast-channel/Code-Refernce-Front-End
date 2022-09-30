import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'show-on-scroll',
  templateUrl: './show-on-scroll.component.html',
  styleUrls: ['./show-on-scroll.component.css']
})
export class ShowOnScrollComponent implements OnInit {

  @Input() position = 100;

  public isShow: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.position) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  
}
