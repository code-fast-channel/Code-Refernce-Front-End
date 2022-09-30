import { Injectable } from '@angular/core';
import { environment, MasterData } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class EmployeeService {
  
  apiPrefix = "api/Employee/"

  constructor(
    private _http: HttpClient,
    private _storage: StorageService,
    private _sharedService: SharedService
  ) {
  }

  employeeRegistration(employeedata) {
    let isSuperAdmin = false
    
    if (employeedata["_id"]['$oid'] === MasterData.superAdminEmployeeId['$oid']) {
      isSuperAdmin = true
    }

    if(isSuperAdmin){
      return this._http.post(environment.apiUrl + this.apiPrefix + "saveDevSuperAdmin", employeedata)
    }
    else{
      return this._http.post(environment.apiUrl + this.apiPrefix + "saveEmployee", employeedata)
    }
  }

  getEmployeeList(searchParams){
    return this._http.post(environment.apiUrl+ this.apiPrefix + "getlist", searchParams)
  }

  getEmployee(id){
    let empId = this._sharedService.serializeMongoObjectId(id)

    let isSuperAdmin = false    
    if (empId === MasterData.superAdminEmployeeId['$oid']) {
      isSuperAdmin = true
    }

    if(isSuperAdmin){
      return this._http.get(environment.apiUrl + this.apiPrefix + "getdevSuperAdmin?id="+ empId)
    }
    else{
      return this._http.get(environment.apiUrl + this.apiPrefix + "getEmployee?id="+ empId)
    }
    
  }

  deleteEmployee(id){
    return this._http.get(environment.apiUrl + this.apiPrefix + "DeleteEmployee?id="+ this._sharedService.serializeMongoObjectId(id))
  } 
}
