
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MasterData } from '@env/environment';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() noBorder = false
  @Input() bgImage
  @Input() toolTip = ""
  @Input() icon = null
  @Input() title = ""
  @Input() subTitle =null
  @Input() footerText = ""
  @Input() fullScreen = false
  @Input() loading = false
  @Input() cardButtons = true
  @Input() refreshButton = true
  @Input() openCloseButton = true
  @Input() fullScreenButton = true
  @Input() crossButton = false
  @Input() header = true
  @Input() open = true
  @Input() headerBorader = true
  @Input() popUpMode = false
  @Input() childCard = false

  @Input() deleteCard = false
  @Output() deleteCardEvent : EventEmitter<boolean> = new EventEmitter<boolean>()
  
  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  masterData = MasterData

  constructor() { }

  toggleFullScreenClicked(){
    this.fullScreen = !this.fullScreen; 
    this.open = true;    
  }
  ngOnInit() {
    if(this.popUpMode){
      this.fullScreenButton = false
      this.openCloseButton = false
      this.childCard = false
    }
  }

  toggleCard(){
    if(!this.fullScreen && this.cardButtons)
    {
      this.open = !this.open
    }
  }

  deleteCardClicked(){
    this.deleteCardEvent.emit(true)
  }

  refreshClicked(event){
    this.refresh.emit(true)
  }

  downloadImage(){

  }

}
