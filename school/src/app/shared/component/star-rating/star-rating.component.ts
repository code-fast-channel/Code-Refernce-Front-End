import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input() isViewMode = false
  @Input() showStars = true
  @Input() showEmoji = true
  @Input('rating') ratingValue: number = 3;
  @Input('starCount') starCount: number = 5;
  @Input() zoom = 110
  
  @Output() ratingSelected: EventEmitter<number> = new EventEmitter<number>();

  public ratingTooltip = ""
  public ratingEmooji = ""
  ratingArr = [];

  constructor(
    private snackBar: MatSnackBar
    ) {}


  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    this.setRatingEmojiAndTooltip()
  }

  onRatingClicked(rating:number) {
    this.ratingValue = rating
    this.setRatingEmojiAndTooltip()
    this.ratingSelected.emit(rating)
    return false;
  }

  setRatingEmojiAndTooltip(){
    switch(this.ratingValue){
      case 1:{
        this.ratingTooltip = "Very bad"
        this.ratingEmooji = "sentiment_very_dissatisfied"
        break;
      }
      case 2:{
        this.ratingTooltip = "Bad"
        this.ratingEmooji = "sentiment_dissatisfied"
        break;
      }
      case 3:{
        this.ratingTooltip = "Satisfied"
        this.ratingEmooji = "sentiment_satisfied"
        break;
      }
      case 4:{
        this.ratingTooltip = "Good"
        this.ratingEmooji = "sentiment_very_satisfied"
        break;
      }
      case 5:{
        this.ratingTooltip = "Excellent"
        this.ratingEmooji = "child_care"
        break;
      }
    }
  }
}

