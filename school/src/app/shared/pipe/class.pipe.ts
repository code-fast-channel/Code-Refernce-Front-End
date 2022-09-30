import { Pipe, PipeTransform } from '@angular/core';
import { MasterData } from '@env/environment';
import { take } from 'rxjs/operators';
import { SharedApiService } from '../services/shared-api.service';

@Pipe({
  name: 'class'
})
export class ClassPipe implements PipeTransform {

  allClassList = null

  constructor(
    private sharedApiService: SharedApiService
  ) {
    this.sharedApiService.getClassSubjectSectionDdl()
      .pipe(take(1))
      .subscribe(val => {
        this.allClassList = val
      },
        error => {
        }
      )
  }
  
  transform(id: any, dbObject?: any): string {
    if(id === null || id === undefined){
      return MasterData.emptyDataText
    }
    
    id = id.$oid ? id.$oid : id
    let cls = this.allClassList.find(x => x._id.$oid === id)
    return cls? cls.name : null;
  }

}
