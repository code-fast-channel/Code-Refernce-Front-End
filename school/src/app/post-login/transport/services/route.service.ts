import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class RouteService {

    apiPrefix = "api/Route/"

    constructor(
        private _http: HttpClient,
        private _storageService: StorageService,
        private _sharedService: SharedService
    ) {
    }

    saveRoute(routeData, id = null) {
        return this._http.post(environment.apiUrl + this.apiPrefix + "saveRoute", routeData)
    }

    getRoute(id) {
        return this._http.get(environment.apiUrl + this.apiPrefix + "getRoute?id=" + this._sharedService.serializeMongoObjectId(id))
    }

    getRouteList(searchParams) {
        return this._http.post(environment.apiUrl + this.apiPrefix + "getRouteList", searchParams)
    }

    deleteRoute(id) {
        return this._http.get(environment.apiUrl + this.apiPrefix + "deleteRoute?id=" + this._sharedService.serializeMongoObjectId(id))
    }
}
