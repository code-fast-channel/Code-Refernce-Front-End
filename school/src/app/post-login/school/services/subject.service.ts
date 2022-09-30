import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '@app/shared/services/shared.service';
import { environment } from '@env/environment';

@Injectable()
export class SubjectService {

  apiPrefix = "api/subject/"

  constructor(
    private _http: HttpClient,
    private _sharedService: SharedService
  ) {
  }

  getSchoolSubjectList(searchParams) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "getSchoolSubjectList", searchParams)
  }

  getSchoolSubject(subjectId) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolSubject?id=" + subjectId)
  }
  saveSchoolSubject(subjectData) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "saveSchoolSubject", subjectData)
  }

  deleteSchoolSubject(id) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "deleteSchoolSubject?id=" + this._sharedService.serializeMongoObjectId(id))
  }

}
