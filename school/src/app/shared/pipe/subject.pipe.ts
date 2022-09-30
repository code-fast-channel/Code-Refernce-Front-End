import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { MasterData } from '@env/environment';
import { SharedApiService } from '../services/shared-api.service';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

@Pipe({
  name: 'subject'
})
export class SubjectPipe implements PipeTransform {

  allSubjectList = null
  constructor(
    private sharedApiService: SharedApiService
  ) {
    this.sharedApiService.getSubjectDdl()
      .pipe(take(1))
      .subscribe(val => {
        this.allSubjectList = val
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
    let subjectName = ""

    let sub = this.allSubjectList.filter(x => x._id.$oid === id)
    if (sub.length > 0) {
      subjectName = sub[0].name;
    }

    return subjectName
  }

}
