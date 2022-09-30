import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'overall-rating-count-chart',
  templateUrl: './overall-rating-count-chart.component.html',
  styleUrls: ['./overall-rating-count-chart.component.css']
})
export class OverallRatingCountChartComponent implements OnInit, AfterContentChecked {

  @Input() eyeButton = true
  @Input() title ="Overall Student rating"
  @Input() ratingRawData
  @Input() ratingStatusCount
  @Input() open = true

  public totalStudents
  public ratingPercentage
  public chartColors = [
    {
      backgroundColor: ['red', 'maroon', 'blue', 'rgb(20, 219, 20)', 'orange']
    },
  ]

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    if (this.ratingRawData) {
      this.segregateRatingCountResults()
    }

    this.calculateRatingPercentage()
  }

  ngAfterContentChecked(): void {
    this.calculateRatingPercentage()
  }

  segregateRatingCountResults() {

    this.ratingStatusCount = {}
    this.ratingStatusCount["veryBad"] = 0
    this.ratingStatusCount["bad"] = 0
    this.ratingStatusCount["satisfied"] = 0
    this.ratingStatusCount["good"] = 0
    this.ratingStatusCount["excellent"] = 0

    this.ratingRawData.forEach(rating => {      
        switch (rating["_id"]["ratingValue"]) {
          case 1: {
            this.ratingStatusCount["veryBad"] = this.ratingStatusCount["veryBad"] + rating["count"]
            break
          }
          case 2: {
            this.ratingStatusCount["bad"] = this.ratingStatusCount["bad"] + rating["count"]
            break
          }
          case 3: {
            this.ratingStatusCount["satisfied"] = this.ratingStatusCount["satisfied"] + rating["count"]
            break
          }
          case 4: {
            this.ratingStatusCount["good"] = this.ratingStatusCount["good"] + rating["count"]
            break
          }
          case 5: {
            this.ratingStatusCount["excellent"] = this.ratingStatusCount["excellent"] + rating["count"]
            break
          }
        }    
    });
  }

  calculateRatingPercentage() {
    this.totalStudents = this.ratingStatusCount["veryBad"] + this.ratingStatusCount["bad"] + this.ratingStatusCount["satisfied"]
      + this.ratingStatusCount["good"] + this.ratingStatusCount["excellent"]

    let totalRating = this.ratingStatusCount["veryBad"] + (2*this.ratingStatusCount["bad"]) + (3*this.ratingStatusCount["satisfied"])
    + (4*this.ratingStatusCount["good"]) + (5*this.ratingStatusCount["excellent"])

    if (totalRating > 0) {
      this.ratingPercentage = (totalRating * 100) / (5 * this.totalStudents)
      this.ratingPercentage = this.ratingPercentage.toFixed(2);
    }
    else {
      this.ratingPercentage = "0.00";
    }
  }

  countCardViewClicked(type) {
    this.router.navigateByUrl("pl/secure/rating/(postLoginOutlet:specificRatingStu)")
  }
}