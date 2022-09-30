import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '@app/shared/services/shared.service';
import { environment } from '@env/environment';

@Injectable()
export class RoleService {

  apiPrefix = "api/role/"

  constructor(
    private _http: HttpClient,
    private _sharedService: SharedService
  ) {
  }

  getSchoolRoleList(searchParams) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "getSchoolRoleList", searchParams)
  }

  getSchoolRole(roleId) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "getSchoolRole?id=" + roleId)
  }
  saveSchoolRole(roleData) {
    return this._http.post(environment.apiUrl + this.apiPrefix + "saveSchoolRole", roleData)
  }

  deleteSchoolRole(id) {
    return this._http.get(environment.apiUrl + this.apiPrefix + "deleteSchoolRole?id=" + this._sharedService.serializeMongoObjectId(id))
  }

}