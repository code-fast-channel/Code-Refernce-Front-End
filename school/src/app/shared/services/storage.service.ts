import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable(
  { providedIn: 'root' } // because we need to detect changes across modules
)
export class StorageService {

  curentRoleChanged$ = new Subject<number>();
  logIn$ = new Subject<boolean>();

  constructor(
    private _router: Router
  ) { }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }  

  removeItem(key) {
    localStorage.removeItem(key);
  }

  removeAllItems() {
    localStorage.clear();
  }

  logOut() {
    this.logIn$.next(false)
    this.removeAllItems()
    this._router.navigateByUrl("/signout")
  }

  switchRole() {
    this._router.navigateByUrl("/switchRole")
  }

  navigateTODashboard() {
    this.logIn$.next(true)
    this._router.navigateByUrl("/pl/secure");
  }
}