import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '@app/shared/services/shared.service';
import { environment } from '@env/environment';

@Injectable()
export class HolidayService {

  apiPrefix = "api/holiday/"

  constructor(
    private _http: HttpClient,
    private _sharedService: SharedService
  ) {
  }

  getSchoolHolidayList(searchParams) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "getSchoolHolidayList", searchParams)
  }

  getSchoolHoliday(holidayId) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolHoliday?id=" + holidayId)
  }
  saveSchoolHoliday(holidayData) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "saveSchoolHoliday", holidayData)
  }

  getSchoolHolidayByDateRange(startDate, endDate) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolHolidayByDateRange?startDate =" + startDate + "&endDate =" + endDate)
  }
  getSchoolHolidayByDate(holidayDate) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolHolidayByDate?holidayDate=" + holidayDate)
  }

  deleteSchoolHoliday(id) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "deleteSchoolHoliday?id=" + this._sharedService.serializeMongoObjectId(id))
  }

}
