import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class EmployeeAttendanceService {
    
    apiPrefix = "api/employeeAttendance/"

    constructor(
        private _http: HttpClient
    ) {}
}
