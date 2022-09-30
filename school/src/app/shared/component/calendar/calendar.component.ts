import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Output() selectedDate: EventEmitter<number> = new EventEmitter<number>();

  public weekday = MasterData.weekday
  public months = MasterData.months

  public calendarMode = 'month'
  public emptyStartDays = []
  public monthDays = []
  public emptyEndDays = []

  public today = { 'year': null, 'month': null, 'date': null }
  public selected = { 'year': null, 'month': null, 'date': null }
  public display = { 'year': null, 'monthName': null, 'month': null, 'date': null }

  constructor() {
    let date = new Date()

    this.selected.year = this.today.year = this.display.year = date.getFullYear()
    this.selected.month = this.today.month = this.display.month = date.getMonth()
    this.selected.date = this.today.date = date.getDate()

    this.drawCalendar(this.display.year, this.display.month)

  }

  ngOnInit() {
    this.dateClicked(this.selected.date, this.selected.month, this.selected.year)
  }

  drawCalendar(year, month) {
    this.display.monthName = this.months[this.display.month]

    let firstDay = new Date(year, month, 1).getDay();
    this.emptyStartDays = new Array(firstDay)

    let lastDay = new Date(year, month + 1, 0).getDay();
    this.emptyEndDays = new Array(6 - lastDay)

    let totalMonthDays = new Date(year, month + 1, 0).getDate();
    this.monthDays = new Array(totalMonthDays)
  }

  previousClicked() {

    if (this.display.month == 0) {
      this.display.month = 11
      this.display.year = this.display.year - 1
    }
    else {
      this.display.month = this.display.month - 1
    }

    this.drawCalendar(this.display.year, this.display.month)
  }

  todayClicked() {
    this.display.year = this.today.year
    this.display.month = this.today.month
    this.display.date = this.today.date

    this.drawCalendar(this.display.year, this.display.month)
    this.dateClicked(this.display.date, this.display.month, this.display.year)
  }

  nextClicked() {

    if (this.display.month == 11) {
      this.display.month = 0
      this.display.year = this.display.year + 1
    }
    else {
      this.display.month = this.display.month + 1
    }

    this.drawCalendar(this.display.year, this.display.month)
  }

  changeMode(modeName) {

    this.calendarMode = modeName

    switch (modeName) {
      case 'month': {

        break;
      }
      case 'week': {

        break;
      }
      case 'day': {

        break;
      }
    }
  }

  dateClicked(dateNumber, monthNumber, yearNumber) {
    this.selected.year = yearNumber
    this.selected.month = monthNumber
    this.selected.date = dateNumber

    var userSelectedDate = new Date(yearNumber, monthNumber, dateNumber).setHours(0, 0, 0, 0)
    this.selectedDate.emit(userSelectedDate)
  }

}
