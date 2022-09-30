import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isToday'
})
export class IsTodayPipe implements PipeTransform {

  transform(inputDate: number, ...args: any[]): boolean {

    let today = new Date().setHours(0, 0, 0, 0)
    return inputDate === today;
  }

}
