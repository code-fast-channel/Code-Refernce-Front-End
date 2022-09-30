import { Pipe, PipeTransform } from '@angular/core';
import { MasterData } from '@env/environment';

@Pipe({
  name: 'ratingDateRange'
})
export class RatingDateRangePipe implements PipeTransform {

  transform(value: number): any {

    if(value){
      console.log(value)
      let date = new Date()
      date.setTime(value)

      let month = date.getMonth()
      let year = date.getFullYear()
      let startDay = date.getDate()
      let lastDay = new Date(year, month + 1, 0).getDate();

      if(startDay === 1){
        lastDay = 10
      }
      else if(startDay === 11){
        lastDay = 20
      }

      let startDayPrefix = startDay < 10 ? "0" : ""

      return startDayPrefix + startDay+" - "+lastDay+" "+ MasterData.months[month] +", "+year
    }

    return null;
  }

}
