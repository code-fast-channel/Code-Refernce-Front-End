import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, Output, EventEmitter, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { MasterData } from '@env/environment';
import { Subject } from 'rxjs';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { StudentGuardianService } from '../services/student-guardian.service';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-new-student-guardian-registration',
  templateUrl: './new-student-guardian-registration.component.html',
  styleUrls: ['./new-student-guardian-registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewStudentguardianRegistrationComponent implements OnInit, AfterViewChecked, OnDestroy {
  private unsubscribe$ = new Subject();

  @Output() public onSaveSuccess = new EventEmitter();
  @Input() changeModeId = null
  @Input() focusId
  @Input() isViewMode = false
  @Input() public open = true
  @Input() public stayOnPage = true
  @Input() roleId: number
  @Input() isComingFromMyProfile = false
  @Input() tabSelectedIndex = 0

  mainForm: FormGroup = new FormGroup({})
  masterData = MasterData

  isLoading = false
  initialFormValues = null

  public editPermissions
  public canSeeSensitiveInfo
  public userAccessPolicy

  noOfActiveStudent = 0
  noOfActiveGuardian = 0

  title = "Add Children and their Guardian Details."
  subTitle = "Please provide following details of student and his/her sibling and their guardians."

  studentSubTitle = "Please add following details of 'Children'."
  guardianSubTitle = "Please add following details of 'Guardian'."
  addressSubTitle = "Please add following details of 'Address'."

  constructor(
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public studentGuardianService: StudentGuardianService,
    private plService: PostLoginService
  ) {}

  checkSensitiveInfoPermissions(){
    this.userAccessPolicy = this.plService.getPageEntitlements(4, 2)
    this.editPermissions = this.userAccessPolicy === 2   

    let user = JSON.parse(this.sharedService.loggedInData())
    this.canSeeSensitiveInfo = this.userAccessPolicy === 2 || this.changeModeId === user["_id"]["$oid"]
  }

  ngOnInit(): void {

    console.log(this.changeModeId)

    this.checkSensitiveInfoPermissions()
    this.setTitleMessages()

    this.mainForm = this.fb.group({
      students: this.fb.array([]),
      guardians: this.fb.array([])
    });

    this.sharedService.setFormCommonFields(this.mainForm)
    if (this.changeModeId) {
      this.populateFromDB()
    }
    else {
      this.addStudent()
      this.addGuardian()
      this.addAddress()
      this.setActiveStudentGuardianCount()
    }
  }

  setTitleMessages() {
    if (this.changeModeId) {
      this.title = "Update Children and their Guardian Details."
      this.subTitle = "Please update following details of student and his/her sibling and their guardians."

      this.studentSubTitle = "Please update following details of 'Children'."
      this.guardianSubTitle = "Please update following details of 'Guardian'."
      this.addressSubTitle = "Please update following details of 'Address'."

      if (this.isViewMode) {
        this.title = "View Children and their Guardian Details."
        this.subTitle = "View following details of student and his/her sibling and their guardians."

        this.studentSubTitle = "View following details of 'Children'."
        this.guardianSubTitle = "View following details of 'Guardian'."
        this.addressSubTitle = "View following details of 'Address'."
      }
    }
  }

  populateFromDB() {
    //--- Fill students and guardian information for View/Edit mode from Database

    this.isLoading = true

    this.studentGuardianService.getStudentGuardian(this.changeModeId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {

          this.isLoading = false

          result.forEach(element => {
            this.initialFormValues = element
            this.mainForm.get('_id').setValue(this.initialFormValues._id)
            this.mainForm.get('status').setValue(this.initialFormValues.status)

            //--- Fill students for View/Edit mode
            for (let idx = 0; idx < (<Array<object>>element["students"]).length; idx++) {
              let id = ((<Array<object>>element["students"])[idx])["_id"]
              let status = ((<Array<object>>element["students"])[idx])["status"]
              this.addStudent(id, status)
            }

            //--- Fill guardians for View/Edit mode
            for (let idx = 0; idx < (<Array<object>>element["guardians"]).length; idx++) {
              let id = ((<Array<object>>element["guardians"])[idx])["_id"]
              let status = ((<Array<object>>element["guardians"])[idx])["status"]
              this.addGuardian(id, status)
            }
          });

          //--- Fill address for View/Edit mode
          this.addAddress()

          this.setActiveStudentGuardianCount()
        },
        (error) => {
          this.isLoading = false
          console.log(error)
        }
      );
  }

  addStudentClicked() {
    this.addStudent()
    this.sharedService.pageLevelSave("New children form")
    this.noOfActiveStudent++
  }
  addStudent(id = null, status = null) {

    (<FormArray>this.mainForm.get('students'))
      .push(
        this.sharedService.setFormCommonFields(
          this.fb.group({
            basicInfo: this.fb.group({}),
            credentialInfo: this.fb.group({}),
            transportInfo: this.fb.group({}),
            academicInfo: this.fb.group({}),
            contactInfo: this.fb.group({}),
            medicalInfo: this.fb.group({}),
            governmentIds: this.fb.group({})
          }),
          id, status
        )
      )
  }

  addGuardianClicked() {
    this.addGuardian()
    this.sharedService.pageLevelSave("New guardian form")
    this.noOfActiveGuardian++
  }
  addGuardian(id = null, status = null) {
    (<FormArray>this.mainForm.get('guardians'))
      .push(
        this.sharedService.setFormCommonFields(
          this.fb.group({
            basicInfo: this.fb.group({}),
            contactInfo: this.fb.group({}),
            credentialInfo: this.fb.group({}),
            occupationInfo: this.fb.group({}),
            governmentIds: this.fb.group({})
          }),
          id, status
        )
      )
  }

  addAddress() {
    this.mainForm.addControl("address", this.fb.group({}))
  }

  deleteStudentClicked(idx, control: AbstractControl) {
    this.permanentDeleteStudent(idx)
  }

  permanentDeleteStudent(idx) {
    let dialogRef = this.sharedService.openConfirmDialog();

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          (<FormArray>this.mainForm.get('students')).removeAt(idx);
          this.noOfActiveStudent--;
          this.sharedService.pageLevelDelete("Student/Children")
        }
      });

  }

  deleteGuardianClicked(idx, control: AbstractControl) {
    this.permanentDeleteGuardian(idx)
  }
  permanentDeleteGuardian(idx) {
    let dialogRef = this.sharedService.openConfirmDialog();

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          (<FormArray>this.mainForm.get('guardians')).removeAt(idx);
          this.noOfActiveGuardian--;
          this.sharedService.pageLevelDelete("Guardian");
        }
      });
  }

  setActiveStudentGuardianCount() {

    this.noOfActiveGuardian = 0
    this.noOfActiveStudent = 0

    let guardiansArray = (<FormArray>this.mainForm.controls["guardians"])
    let studentsArray = (<FormArray>this.mainForm.controls["students"])

    for (let idx = 0; idx < guardiansArray.length; idx++) {
      let gp = <FormGroup>guardiansArray.controls[idx]
      if (gp.get('status').value === 1) {
        this.noOfActiveGuardian++
      }
    }

    for (let idx = 0; idx < studentsArray.length; idx++) {
      let gp = <FormGroup>studentsArray.controls[idx]
      if (gp.get('status').value === 1) {
        this.noOfActiveStudent++
      }
    }
  }

  onSubmit(event: Event) {

    this.mainForm.markAllAsTouched()
    event.preventDefault();
    event.stopPropagation();

    if (this.mainForm.valid) {
      this.isLoading = true

      this.studentGuardianService.studentGuardianRegistration(
        this.mainForm.getRawValue(),
        this.changeModeId
      )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false

            if (result.isSuccess) {
              this.onSaveSuccess.emit(true)
              this.sharedService.openSnackBar(result.message, "x", "success")

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