import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class StudentService {

  apiPrefix = "api/student/"

  constructor(
    private _http: HttpClient,
    private _storage: StorageService,
    private _sharedService: SharedService
  ) {
  }

  getStudentList(searchParams){
    return this._http.post(environment.apiUrl+ this.apiPrefix + "getlist", searchParams)
  }

  deleteStudent(id){
    return this._http.get(environment.apiUrl+ this.apiPrefix + "Deactivate?id="+ this._sharedService.serializeMongoObjectId(id))
  }
}
