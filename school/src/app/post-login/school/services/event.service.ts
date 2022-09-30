import { Injectable } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  apiPrefix = "api/event/"

  constructor(
    private _http: HttpClient,
    private _sharedService: SharedService
  ) {
  }

  getSchoolEventList(searchParams) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "getSchoolEventList", searchParams)
  }

  getSchoolEvent(eventId) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolEvent?id=" + eventId)
  }
  saveSchoolEvent(eventData) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "saveSchoolEvent", eventData)
  }

  getSchoolEventByDateRange(startDate, endDate) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolEventByDateRange?startDate =" + startDate + "&endDate =" + endDate)
  }
  getSchoolEventByDate(agendaDate) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolEventByDate?agendaDate=" + agendaDate)
  }

  deleteEvent(id) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "deleteSchoolEvent?id=" + this._sharedService.serializeMongoObjectId(id))
  }
}
