import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class SignInService {

  apiPrefix = "api/SignIn/"

  constructor(
    private _http: HttpClient
  ) {
  }

  SignIn(loginData) {
      return this._http.post(environment.apiUrl + this.apiPrefix + "authenticate", loginData)
  }
}
