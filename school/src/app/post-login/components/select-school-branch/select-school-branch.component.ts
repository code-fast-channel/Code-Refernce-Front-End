import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '@app/shared/services/shared.service';
import { SharedApiService } from '@app/shared/services/shared-api.service';

@Component({
  selector: 'app-select-school-branch',
  templateUrl: './select-school-branch.component.html',
  styleUrls: ['./select-school-branch.component.css']
})
export class SelectSchoolBranchComponent implements OnInit, OnDestroy {
 
  private unsubscribe$ = new Subject();
  
  isLoading = false;

  schools = [];

  viewUserId : any
  viewUser = false

  constructor(
    private sharedApiService: SharedApiService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getList()
  }

  getList()
  {
    this.isLoading = true;

    this.sharedApiService.getSchoolBranchDdl()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (result: any) => {       
        this.isLoading =false
        this.schools = result      
      }, 
      (error) => {
        this.isLoading =false
        console.log(error)
      }
      );    
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  schoolBranchClicked(schoolId, schoolBranchId){
    this.sharedService.currentSchoolId(schoolId)
    this.sharedService.currentSchoolBranchId(schoolBranchId)
  }

}
