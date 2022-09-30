import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class SchoolService {

    apiPrefix = "api/school/"

    constructor(
        private _http: HttpClient,
        private _storageService: StorageService,
        private _sharedService: SharedService
    ) {
    }

    saveSchool(schoolData, id = null) {
        return this._http.post(environment.apiUrl + this.apiPrefix + "saveSchool", schoolData)
    }

    getSchool(id) {
        return this._http.get(environment.apiUrl + this.apiPrefix + "getSchool?id=" + this._sharedService.serializeMongoObjectId(id))
    }

    getSchoolList (searchParams){
        return this._http.post(environment.apiUrl+ this.apiPrefix + "getSchoolList", searchParams)
      }

    deleteSchool(id) {
        return this._http.get(environment.apiUrl + this.apiPrefix + "Deactivate?id=" + this._sharedService.serializeMongoObjectId(id))
    }  
    
    setupBranchRoles(id) {
        return this._http.get(environment.apiUrl + this.apiPrefix + "setupBranchRoles?id=" + this._sharedService.serializeMongoObjectId(id))
    }
}
