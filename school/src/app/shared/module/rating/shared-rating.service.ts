import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedRatingService {

  apiPrefix = "api/studentRating/"
  environment = environment

    constructor(
        private _http: HttpClient
    ) {}

    getStudentwholeRating(ratingSearch) {
        return this._http.post(environment.apiUrl + this.apiPrefix + "getStudentWholeRating", ratingSearch)
    }
}
