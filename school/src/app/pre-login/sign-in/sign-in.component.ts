import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '@app/shared/services/storage.service';
import { validationType, FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';
import { SignInService } from '../services/sign-in.service';
import { MasterData } from '@env/environment';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  fieldsConfig: FieldConfig[] = [
    {
      isViewMode: false,
      type: "select",
      label: "User Type",
      name: "userType",
      icon: "nature_people",
      options: MasterData.signInType,
      validations: [validationType.required()]
    },
    {
      isViewMode: false,
      type: "input",
      label: "Login Id",
      inputType: "text",
      name: "loginId",
      icon: "security",
      validations: [validationType.required()]
    },
    {
      isViewMode: false,
      type: "input",
      label: "Password",
      inputType: "password",
      name: "password",
      validations: [validationType.required()]
    }  
  ]

  hide = true;
  _isLoading = false

  mainForm: FormGroup = new FormGroup({})
  masterData = MasterData

  constructor(
    private signService: SignInService,
    private _storage: StorageService,
    private sharedService: SharedService,
    private _router: Router
  ) {
    //--- Clear previous storages if any ---
    this._storage.removeAllItems()
  }

  ngOnInit() { 
    this.sharedService.currentSchoolId("293535a80000000000000000")
    this.sharedService.currentSchoolBranchId("293543f50000000000000000")
  }

  onSubmit(event) {

    this.mainForm.markAllAsTouched()
    event.preventDefault();
    event.stopPropagation();

    if (this.mainForm.valid) {

      this._isLoading = true;

      this.signService
        .SignIn(this.mainForm.value).pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (data: string) => {
            if (data.length > 0) {
              data = data[0]
              this.setUpUserSession(data)
              this.sharedService.openSnackBar("Login Id and Password verified successfully.", "x", "success", 2000)
            }
            else {
              this.sharedService.openSnackBar("Invalid login details.", "x", "fail")
            }
            this._isLoading = false
          },
          (error) => {
            this._isLoading = false
            alert("Sorry! Unable to login." + error)
          }
        );
    }
    else {
      this.sharedService.openSnackBar("Please enter your credentials properly.", "x", "fail")
    }
  }

  setUpUserSession(data) {
    this.sharedService.loggedInData(JSON.stringify(data));
    this.sharedService.currentSchoolId(data["schoolId"])
    this.sharedService.currentSchoolBranchId(data["schoolBranchId"])

    this.setupUserIdAndRoleId(data)
  }

  setupUserIdAndRoleId(data) {

    switch (this.mainForm.controls["userType"].value) {
      case "employee":
      case "devTeam":
        {
          console.log("employee Logged in")

          this.sharedService.CurrentUserId(data["_id"])

          if (data["roles"].length === 1) {
            this.sharedService.currentUserRoleId(data["roles"][0])
            this.navigateTODashboard();
          }
          else {            
            this.sharedService.currentUserRoleId(null)
            this._storage.switchRole()
          }

          break;
        }
      case "student":
        {
          console.log("student Logged in")

          this.sharedService.CurrentUserId(data["studentId"])
          this.sharedService.currentUserRoleId(this.masterData.studentRoleId)
          this.navigateTODashboard();

          break;
        }
      case "guardian":
        {
          console.log("guardian Logged in")
          
          this.sharedService.CurrentUserId(data["guardianId"])
          this.sharedService.currentUserRoleId(this.masterData.guardianRoleId)
          this.navigateTODashboard();
          break;
        }
    }
  }

  navigateTODashboard() {
    this._storage.navigateTODashboard()
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}