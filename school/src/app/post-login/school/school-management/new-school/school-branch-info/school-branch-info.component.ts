import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SchoolService } from '@app/post-login/school/services/school.service';

@Component({
  selector: 'app-school-branch-info',
  templateUrl: './school-branch-info.component.html',
  styleUrls: ['./school-branch-info.component.css']
})
export class SchoolBranchInfoComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Input() isSuperAdmin
  @Input() form: FormGroup
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  @Input() changeModeId = null

  masterData = MasterData

  classCount = 0
  public isLoading

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {

    this.form.addControl(
      "branchBasicInfo", this.fb.group({})
    )
    this.form.addControl(
      "branchContact", this.fb.group({})
    )
    this.form.addControl(
      "branchAddress", this.fb.group({})
    )
   
  }

  setUpBranchRoles(){
    this.isLoading = true

    this.schoolService.setupBranchRoles(this.initialFormValues._id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (result: any) => {
        this.isLoading = false
        if (result.isSuccess) {
          this.sharedService.openSnackBar(result.message, "x", "success")
        }
        else {
          this.sharedService.openSnackBar(result.message, "x", "fail")
        } 
      },
      (error: any) => {
        this.isLoading= false
        console.log(error)
      }
    );
  }

  createBranchDefaultUser(){

  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
