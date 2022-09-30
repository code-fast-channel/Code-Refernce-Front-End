import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '@app/shared/services/shared.service';
import { environment } from '@env/environment';

@Injectable()
export class ExamTypeService {

  apiPrefix = "api/examType/"

  constructor(
    private _http: HttpClient,
    private _sharedService: SharedService
  ) {
  }

  getSchoolExamTypeList(searchParams) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "getSchoolExamTypeList", searchParams)
  }

  getSchoolExamType(subjectId) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolExamType?id=" + subjectId)
  }
  saveSchoolExamType(subjectData) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "saveSchoolExamType", subjectData)
  }

  deleteSchoolExamType(id) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "deleteSchoolExamType?id=" + this._sharedService.serializeMongoObjectId(id))
  }

}
