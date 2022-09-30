import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate {
 
  constructor(
    private router: Router,
    private sharedService: SharedService
    ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    //If token data exist, user may login to application
    if (this.sharedService.loggedInData()) {
    return true;
    }
    
    // otherwise redirect to login page with the return url
    this.router.navigate(['/public/guest'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
