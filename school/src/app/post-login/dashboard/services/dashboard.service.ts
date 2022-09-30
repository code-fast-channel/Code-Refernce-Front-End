import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DashboardService {

    apiPrefix = "api/dashboard/"

    constructor(
        private http: HttpClient
    ) {}

    getCounts() {
        return this.http.get(environment.apiUrl + this.apiPrefix + "schoolStrengthAndAttendanceCount")
    }

    saveNoticeBoard(data){
        return this.http.post(environment.apiUrl + this.apiPrefix + "saveNoticeBoard", data)
    }

    getNoticeBoard(){
        return this.http.get(environment.apiUrl + this.apiPrefix + "getNoticeBoard")
    }
}
