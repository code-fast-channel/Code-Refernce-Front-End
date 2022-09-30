import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class TransportService {

    apiPrefix = "api/Transport/"

    constructor(
        private _http: HttpClient,
        private _storageService: StorageService,
        private _sharedService: SharedService
    ) {
    }
}
