import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';

@Injectable()
export class PreLoginService {

  constructor(
    private _http: HttpClient
   ) {}

  signIn(loginId: string, password: string){
   return this._http.get(environment.apiUrl+"signin")
  }

  signOut(){
  }

}