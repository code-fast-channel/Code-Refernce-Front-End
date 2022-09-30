import { Pipe, PipeTransform } from '@angular/core';
import { SharedApiService } from '../services/shared-api.service';
import { take } from 'rxjs/operators';
import { MasterData } from '@env/environment';

@Pipe({
  name: 'school'
})
export class SchoolPipe implements PipeTransform {

  allSchoolBranchList = null

  constructor(
    private sharedApiService: SharedApiService
  ) {
    this.sharedApiService.getSchoolBranchDdl()
      .pipe(take(1))
      .subscribe(val => {
        this.allSchoolBranchList = val
      },
        error => {
        }
      )
  }
  
  transform(id: any, args?: any): string {
    if(id === null || id === undefined){
      return MasterData.emptyDataText
    }
    
    id = id.$oid ? id.$oid : id

    switch (args) {
      case "branch": {
        return this.hasData(this.allSchoolBranchList.filter(x => x._id.$oid === id))
      }
    }
  }

  hasData(filteredData){
    console.log(filteredData)
    if(filteredData.length > 0){
      return filteredData[0].name
    }
    else{
      return MasterData.emptyDataText
    }
  }

}
