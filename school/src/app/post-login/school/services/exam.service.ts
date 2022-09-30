import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '@app/shared/services/shared.service';
import { environment } from '@env/environment';

@Injectable()
export class ExamService {

  apiPrefix = "api/exam/"

  constructor(
    private _http: HttpClient,
    private _sharedService: SharedService
  ) {
  }

  getSchoolExamList(searchParams) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "getSchoolExamList", searchParams)
  }

  getSchoolExam(examId) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolExam?id=" + examId)
  }
  saveSchoolExam(examData) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "saveSchoolExam", examData)
  }

  getSchoolExamByDateRange(startDate, endDate) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolExamByDateRange?startDate =" + startDate + "&endDate =" + endDate)
  }
  getSchoolExamByDate(examDate) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolExamByDate?agendaDate=" + examDate)
  }

  deleteSchoolExam(id) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "deleteSchoolExam?id=" + this._sharedService.serializeMongoObjectId(id))
  }

}
