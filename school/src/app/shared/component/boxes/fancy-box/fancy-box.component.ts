import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fancy-box',
  templateUrl: './fancy-box.component.html',
  styleUrls: ['./fancy-box.component.css']
})
export class FancyBoxComponent implements OnInit {

  @Input() theme = null
  @Input() icon
  @Input() color = null
  constructor() { }

  ngOnInit(): void {
    this.setColors();
  }
  setColors(){
  
      switch(this.theme){
        case 'theme1':{
          this.color = "#f1463e"
          break;
        }
        case 'theme2':{
          this.color = "#8cc152"
          break;
        }
        case 'theme3':{
          this.color = "#5e51c6"
          break;
        }      
        case 'theme4':{
          this.color = "goldenrod"
          break;
        }
        case 'theme5':{
          this.color = "#1eaaf1"
          break;
        }
      }
  }

}
