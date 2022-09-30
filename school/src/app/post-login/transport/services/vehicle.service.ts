import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class VehicleService {

    apiPrefix = "api/vehicle/"

    constructor(
        private _http: HttpClient,
        private _storageService: StorageService,
        private _sharedService: SharedService
    ) {
    }

    saveVehicle(vehicleData, id = null) {
        return this._http.post(environment.apiUrl + this.apiPrefix + "saveVehicle", vehicleData)
    }

    getVehicle(id) {
        return this._http.get(environment.apiUrl + this.apiPrefix + "getVehicle?id=" + this._sharedService.serializeMongoObjectId(id))
    }

    getVehicleList (searchParams){
        return this._http.post(environment.apiUrl+ this.apiPrefix + "getVehicleList", searchParams)
      }

    deleteVehicle(id) {
        return this._http.get(environment.apiUrl + this.apiPrefix + "deleteVehicle?id=" + this._sharedService.serializeMongoObjectId(id))
    }
}
