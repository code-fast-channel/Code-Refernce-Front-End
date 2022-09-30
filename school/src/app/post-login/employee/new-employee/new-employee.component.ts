import { Component, OnInit, AfterViewChecked, OnDestroy, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { EmployeeService } from '../services/employee.service';
import { takeUntil } from 'rxjs/operators';
import { PostLoginService } from '@app/post-login/post-login.service';
import { UserRolePipe } from '@app/shared/pipe/user-role.pipe';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit, AfterViewChecked, OnDestroy {
  private unsubscribe$ = new Subject();

  @Output() public onSaveSuccess = new EventEmitter();
  @Input() changeModeId = null
  @Input() isViewMode = false
  @Input() public open = true
  @Input() public stayOnPage = true
  @Input() roleId: number
  @Input() isComingFromMyProfile = false
  @Input() entity = 'Employee'

  mainForm: FormGroup = new FormGroup({})
  masterData = MasterData

  isPopulatingFormDb = false
  isLoading = false
  initialFormValues = null

  noOfActiveEmployee = 0
  noOfActive = 0

  title = `Add ${this.entity} Details.`
  subTitle = `Please provide following details of ${this.entity}.`

  employeeSubTitle = `Please add following details of '${this.entity}'.`
  addressSubTitle = "Please add following details of 'Address'."

  public canSeeSensitiveInfo
  public canChangeHisOwnRole = false

  constructor(
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public employeeService: EmployeeService,
    private plService: PostLoginService,
    private userRolePipe : UserRolePipe
  ) {
  }

  ngOnInit(): void {
    this.checkCanChangeHisOwnRoles()
    this.checkSensitiveInfoPermissions()
    this.setTitleMessages()

    this.mainForm = this.fb.group({
      basicInfo: this.fb.group({}),
      credentialInfo: this.fb.group({}),
      transportInfo: this.fb.group({}),
      contactInfo: this.fb.group({}),
      medicalInfo: this.fb.group({}),
      governmentIds: this.fb.group({}),
      addressInfo: this.fb.group({})
    });

    this.sharedService.setFormCommonFields(this.mainForm)

    if (this.changeModeId) {
      this.populateFromDB()
    }

  }

  
  checkCanChangeHisOwnRoles(){
    let user = JSON.parse(this.sharedService.loggedInData())
    let currentUserRoleId = this.sharedService.currentUserRoleId();
    let isanyadmin = this.userRolePipe.transform(currentUserRoleId, 'isanyadmin')
    this.canChangeHisOwnRole = isanyadmin || this.changeModeId != user["_id"]["$oid"]
  }

  checkSensitiveInfoPermissions(){
    let user = JSON.parse(this.sharedService.loggedInData())
    this.canSeeSensitiveInfo = this.plService.getPageEntitlements(5, 1) == 2 || this.changeModeId === user["_id"]["$oid"]
  }

  setTitleMessages() {
    if (this.changeModeId) {
      this.title = `Update ${this.entity}.`
      this.subTitle = `Please update following details of ${this.entity}.`

      if (this.isViewMode) {
        this.title = `View ${this.entity}.`
        this.subTitle = `View following details of ${this.entity}.`

      }
    }
  }

  populateFromDB() {
    //--- Fill employees and  information for View/Edit mode from Database

    this.isPopulatingFormDb = true
    this.isLoading = true

    this.employeeService.getEmployee(this.changeModeId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {

          this.isPopulatingFormDb = false
          this.isLoading = false

          result.forEach(element => {
            this.initialFormValues = element
            this.mainForm.get('_id').setValue(this.initialFormValues._id)
            this.mainForm.get('status').setValue(this.initialFormValues.status)
          });
        },
        (error) => {
          this.isPopulatingFormDb = false
          this.isLoading = false
          console.log(error)
        }
      );
  }

  deactivateRecord(control: AbstractControl, fieldName: string) {
    let dialogRef = this.sharedService.openConfirmDialog()

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        control.setValue(0)
        this.sharedService.pageLevelDelete(fieldName)
      }
    });
  }

  onSubmit(event: Event) {

    this.mainForm.markAllAsTouched()
    event.preventDefault();
    event.stopPropagation();

    if (this.mainForm.valid) {
      this.isLoading = true

      this.employeeService.employeeRegistration(
        this.mainForm.value
      )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false

            if (result.isSuccess) {
              this.onSaveSuccess.emit(true)
              this.sharedService.openSnackBar(`${this.entity} information get saved successfully.`, "x", "success")

              if (!this.isComingFromMyProfile) {
                this.sharedService.resetFormControls(this.mainForm)
              }
            }
            else {
              this.sharedService.openSnackBar(result.message, "x", "fail")
            }

          },
          (error) => {
            this.isLoading = false
            console.log(error)
          }
        );
    } else {
      this.sharedService.openSnackBar("Some fields are invalid. Please fill them properly.", "x", "fail")
    }
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}