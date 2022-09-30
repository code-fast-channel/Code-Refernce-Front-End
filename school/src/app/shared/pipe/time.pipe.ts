import { Pipe, PipeTransform } from '@angular/core';
import { MasterData } from '@env/environment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: any): any {

    if(time === null || time === undefined){
      return MasterData.emptyDataText
    }

    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour >= 12 ? 'pm' : 'am';
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;

    if(hour == 0){
      hour = 12
    }

    hour = (hour+'').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`
  }

}
