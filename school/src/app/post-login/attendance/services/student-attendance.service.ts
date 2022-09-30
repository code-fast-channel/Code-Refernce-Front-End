import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class StudentAttendanceService {

    apiPrefix = "api/studentAttendance/"

    constructor(
        private _http: HttpClient
    ) {}

    getClassSectionAttendance(attendanceSearch) {
        return this._http.post(environment.apiUrl + this.apiPrefix + "getClassSectionAttendance", attendanceSearch)
    }

    saveAttendance(attendance) {
        return this._http.post(environment.apiUrl + this.apiPrefix + "saveAttendance", attendance)
    }

    resetAttendance() {
        return this._http.get(environment.apiUrl + this.apiPrefix + "resetAttendance")
    }
}
