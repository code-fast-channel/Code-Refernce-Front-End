import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable()
export class StudentRatingService {

    apiPrefix = "api/studentRating/"

    constructor(
        private _http: HttpClient
    ) {}

    getClassSectionRating(ratingSearch) {
        return this._http.post(environment.apiUrl + this.apiPrefix + "getClassSectionRating", ratingSearch)
    }

    getSpecificRatingStudents(ratingValue) {
        return this._http.get(environment.apiUrl + this.apiPrefix + "getSpecificRatingStudents?ratingValue=" + ratingValue)
    }

    saveRating(rating) {
        return this._http.post(environment.apiUrl + this.apiPrefix + "saveRating", rating)
    }

    resetRating() {
        return this._http.get(environment.apiUrl + this.apiPrefix + "resetRating")
    }
}
