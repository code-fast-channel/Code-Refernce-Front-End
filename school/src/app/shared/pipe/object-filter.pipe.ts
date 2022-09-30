import { Pipe, PipeTransform } from '@angular/core';
import { MasterData } from '@env/environment';

@Pipe({
  name: 'objectFilter'
})
export class ObjectFilterPipe implements PipeTransform {

  transform(value: any, obj: [], compareField: string, displayField: string): any {

    if(value === null || value === undefined){
      return MasterData.emptyDataText
    }

    let isMongoId = value && value.$oid


    let result = null

    if(isMongoId){
      obj.forEach(x => {
        if(x[compareField]['$oid'] === value['$oid']){
          result = x[displayField]
        }  
      });
    }
    else{
      obj.forEach(x => {
        if(x[compareField] === value){
          result = x[displayField]
        } 
      });      
    }

    return result;
  }

}
