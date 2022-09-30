import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class ClassService {

  apiPrefix = "api/class/"

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService,
    private _sharedService: SharedService
  ) {
  }

  saveClass(classData, id = null) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "saveClass", classData)
  }

  getClass(id) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getClass?id=" + this._sharedService.serializeMongoObjectId(id))
  }

  getClassList(searchParams) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "getClassList", searchParams)
  }

  deleteClass(id) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "deleteClass?id=" + this._sharedService.serializeMongoObjectId(id))
  }
}
