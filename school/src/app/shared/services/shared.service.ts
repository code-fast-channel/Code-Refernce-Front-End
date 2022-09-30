import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '@env/environment';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FieldConfig } from '../component/dynamic-form/field.interface';
import { ConfirmationDialogComponent } from '../component/confirmation-dialog/confirmation-dialog.component';
import { ObjectID } from 'bson';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';


@Injectable({
  providedIn: 'root' // because we need to detect changes across modules
})
export class SharedService {

  constructor(
    private storageService: StorageService,
    private _http: HttpClient,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  generateHttpHeader(): HttpHeaders {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer validToke.'
    });

    return httpHeaders;
  }


  //******************Upload documents/media*****************************************

  uploadFile(files: File[], fileType: string, userId = null): Observable<object> {

    if (!this.loggedInData()) {
      return;
    }
    let destinationPath;
    switch (fileType) {
      case 'profilePic': {
        destinationPath = this.getUserProflePicDirectory();
        break
      }
    }

    var formData = new FormData();

    if (!userId) {
      // If no user id provided then change the Profile pic of loggedin user
      userId = this.serializeMongoObjectId(this.CurrentUserId())
    }

    Array.from(files).forEach(f => {
      let fileName = userId + f.name.substring(f.name.lastIndexOf("."), f.name.length)

      if (fileType === 'profilePic') {
        fileName = userId + '.png'
      }

      formData.append(destinationPath + fileName, f)
    })
    return this._http.post(environment.ftpUrl + "api/UploadFile/upload", formData)
  }

  uploadBytes(fileType: string, data: any, userId = null): Observable<object> {

    if (!this.loggedInData()) {
      return;
    }

    let destinationPath;

    switch (fileType) {
      case 'profilePic': {
        destinationPath = this.getUserProflePicDirectory();
        break
      }
    }

    if (!userId) {
      // If no user id provided then change the Profile pic of loggedin user
      userId = this.serializeMongoObjectId(this.CurrentUserId())
    }

    destinationPath = destinationPath + userId + ".png"

    let payLoad = {
      fileName: destinationPath,
      file: data
    }


    return this._http.post(environment.ftpUrl + "api/UploadFile/UploadBytes", payLoad)
  }

  //--------------------------------------------------------------------------------


  //******************Snack bar and dialog*****************************************

  openSnackBar(message: string, action: string, snackType = "default", duration = 10000) {

    let snackClass = snackType + "-snackbar"

    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      duration: duration,
      panelClass: [snackClass]
    });
  }

  pageLevelSave(fieldName: string) {
    this.openSnackBar(fieldName + " added. " + "Please press the 'Save' button to save your changes", "x", "info")
  }
  pageLevelDelete(fieldName: string) {
    this.openSnackBar(fieldName + " deleted. " + "Please press the 'Save' button to save your changes", "x", "info")
  }
  pageLevelActivate(fieldName: string) {
    this.openSnackBar(fieldName + " activated. " + "Please press the 'Save' button to save your changes", "x", "info")
  }


  openConfirmDialog(message = "You want to delete this?", okButton = "Yes", cancelButton = "No"): MatDialogRef<ConfirmationDialogComponent> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: message,
        buttonText: {
          ok: okButton,
          cancel: cancelButton
        }
      }
    });

    return dialogRef
  }

  //----------------------------------------------------------------------------------

  //**************** Mongo DB ******************************************************/
  generateMongoObjectId(id = null) {
    if (!id) {
      id = new ObjectID().toHexString()
    }
    return { "$oid": id }
  }

  serializeMongoObjectId(mongoId) {
    try {
      mongoId = JSON.parse(mongoId)
    }
    catch (ex) { }

    if (mongoId == null) {
      return null
    }
    return mongoId.$oid == undefined ? mongoId : mongoId.$oid
  }

  //------------------------------------------------------------------------------

  //**************** Forms ****************************************************

  setFormCommonFields(form: FormGroup, id = null, status = null): FormGroup {

    if (!form.contains("_id")) {
      form.addControl("_id",
        new FormControl(
          id == null ? this.generateMongoObjectId() : id,
          Validators.required
        )
      )
    }

    if (!form.contains("status")) {
      form.addControl("status",
        new FormControl(
          status == null ? 1 : status,
          Validators.required
        )
      )
    }

    return form
  }

  setFormInitialValueForChangeMode(fieldsConfig: FieldConfig[], initialFormValues) {
    if (fieldsConfig) {
      fieldsConfig.forEach(element => {

        if (initialFormValues && initialFormValues[element.name] != null) {
          element.value = initialFormValues[element.name]
        }
      });
    }
    return fieldsConfig
  }


  copyFormControl(control: AbstractControl) {
    if (control instanceof FormControl) {
      return new FormControl(control.value)
    }
    else if (control instanceof FormGroup) {
      const copy = new FormGroup({});
      Object.keys(control.getRawValue()).forEach(key => {
        copy.addControl(key, this.copyFormControl(control.controls[key]));
      });
      return copy;
    }
    else if (control instanceof FormArray) {
      const copy = new FormArray([]);
      control.controls.forEach(control => {
        copy.push(this.copyFormControl(control));
      })
      return copy;
    }
  }

  //----------------------------------------------------------------------------


  //*************** Setup loacalStorage/Sessions *******************/
  loggedInData(data = null) {
    if (data === null) {
      try {
        return JSON.parse(this.storageService.getItem("loggedInData"))
      }
      catch (e) {
        return null;
      }
    }
    else {
      this.storageService.setItem("loggedInData", JSON.stringify(data))
    }
  }

  currentUserRoleId(roleId = null): any {
    if (roleId === null) {
      return JSON.parse(this.storageService.getItem("currentUserRoleId"))
    }
    else {
      this.storageService.setItem("currentUserRoleId", JSON.stringify(roleId))
      this.storageService.curentRoleChanged$.next(roleId)
      return roleId
    }
  }

  CurrentUserId(userId = null): any {
    if (userId === null) {
      return this.generateMongoObjectId(this.storageService.getItem("currentUserId"))
    }
    else {
      userId = this.serializeMongoObjectId(userId)
      this.storageService.setItem("currentUserId", userId)
    }
  }

  currentSchoolId(schoolId = null): any {
    if (schoolId == null) {
      return this.generateMongoObjectId(this.storageService.getItem("currentSchoolId"))
    }
    else {
      schoolId = this.serializeMongoObjectId(schoolId)
      this.storageService.setItem("currentSchoolId", schoolId)
    }
  }

  currentSchoolBranchId(schoolBranchId = null): any {
    if (schoolBranchId == null) {
      return this.generateMongoObjectId(this.storageService.getItem("currentSchoolBranchId"))
    }
    else {
      schoolBranchId = this.serializeMongoObjectId(schoolBranchId)
      this.storageService.setItem("currentSchoolBranchId", schoolBranchId)
    }
  }

  getUserProflePicDirectory() {
    let schoolId = this.serializeMongoObjectId(this.currentSchoolId())
    let branchId = this.serializeMongoObjectId(this.currentSchoolBranchId())

    return "UploadedData/" + schoolId + "/" + branchId + "/images/user/profilePic/";
  }

  //*********** Reset Whole Form ******************/
  resetFormControls(mainForm: FormGroup | FormArray) {

    Object.keys(mainForm.controls).forEach(key => {

      let control = mainForm.get(key)

      if (control instanceof FormControl) {
        if (key !== 'status' && key !== '_id') {
          mainForm.get(key).setValue(null)
          mainForm.get(key).markAsUntouched()
        }
      }
      if (control instanceof FormGroup) {
        this.resetFormControls(control)
      }
      if (control instanceof FormArray) {
        this.resetFormControls(control)
      }
    })
  }

  //***************** Group by a object **********************/
  GroupBy11111(object, groupBy) {
    return object.reduce(function (rv, x) {
      (rv[x[groupBy]] = rv[x[groupBy]] || []).push(x);
      return rv;
    }, {});
  }


  GroupBy(object, groupByFieldName, groupByResultDataName = "data") {

    let result = []
    object.forEach(element => {

      if (result[element[groupByFieldName]] === undefined) {
        result[element[groupByFieldName]] = []
      }

      result[element[groupByFieldName]].push(element)
    });

    let finalResult = []

    Object.keys(result).forEach(key => {
      let obj = {}
      obj[groupByFieldName] = key
      obj[groupByResultDataName] = result[key]
      finalResult.push(obj)
    })

    return finalResult
  }


  //*********************Sort object */

  sortObject(obj, fieldName, isDecending = false) {
    let sortedData = obj.sort(function (a, b) {
      if (a[fieldName] < b[fieldName])
        return isDecending ? 1 : -1;
      else if (a[fieldName] > b[fieldName])
        return isDecending ? -1 : 1;
      else return 0;
    })

    return sortedData
  }
}
