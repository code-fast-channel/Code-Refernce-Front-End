import { Pipe, PipeTransform } from '@angular/core';
import { SharedApiService } from '../services/shared-api.service';
import { take } from 'rxjs/operators';
import { MasterData } from '@env/environment';

@Pipe({
  name: 'examType'
})
export class ExamTypePipe implements PipeTransform {

  allExamTypeList = null
  constructor(
    private sharedApiService: SharedApiService
  ) {
    this.sharedApiService.getExamTypeDdl()
      .pipe(take(1))
      .subscribe(val => {
        this.allExamTypeList = val
      },
        error => {
        }
      )
  }

  transform(id: any): string {

    if (id === null || id === undefined) {
      return MasterData.emptyDataText
    }

    id = id.$oid ? id.$oid : id
    
    let examTypeName = ""

    let exam = this.allExamTypeList.filter(x => x._id.$oid === id)
    if (exam.length > 0) {
      examTypeName = exam[0].name;
    }

    return examTypeName
  }

}
