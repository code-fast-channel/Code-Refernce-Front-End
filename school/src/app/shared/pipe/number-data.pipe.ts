import { Pipe, PipeTransform } from '@angular/core';
import { MasterData } from '@env/environment';

@Pipe({
  name: 'numberData'
})
export class NumberDataPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if(value === null || value === undefined){
      return MasterData.emptyDataText
    }

    return value < 10 ? '0'+value : value
  }

}
