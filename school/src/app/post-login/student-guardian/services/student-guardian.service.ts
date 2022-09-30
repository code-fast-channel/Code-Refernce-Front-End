import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class StudentGuardianService {
  apiPrefix = "api/StudentGuardian/"

  constructor(
    private _http: HttpClient,
    private _storage: StorageService,
    private _sharedService: SharedService
  ) {
  }

  studentGuardianRegistration(studentParentdata, id = null) {
      return this._http.post(environment.apiUrl + this.apiPrefix + "saveStudentGuardian", studentParentdata)
  }

  getStudentGuardian(id){
    return this._http.get(environment.apiUrl + this.apiPrefix + "getStudentGuardian?id="+ this._sharedService.serializeMongoObjectId(id))
  }

  deleteStudentGuardian(id){
    return this._http.get(environment.apiUrl + this.apiPrefix + "DeleteStudentGuardian?id="+ this._sharedService.serializeMongoObjectId(id))
  }

}
