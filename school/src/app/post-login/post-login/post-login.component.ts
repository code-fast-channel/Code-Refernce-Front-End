import { Component, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from '@app/shared/services/shared.service';
import { StorageService } from '@app/shared/services/storage.service';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RouterOutlet, ActivationStart, Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { MasterData, environment } from '@env/environment';
import { PostLoginHeaderComponent } from '../post-login-header/post-login-header.component';
import { SharedApiService } from '@app/shared/services/shared-api.service';

@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.css']
})
export class PostLoginComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild('header') header: PostLoginHeaderComponent

  profilePicPath: string
  isUserLogin = true

  public showShideNav = false
  public masterData = MasterData
  public isLoading = false
  public isLoadingPage = false
  public currentSchoolBranchId
  
  constructor(
    public sharedService: SharedService,   
    private sharedApiService: SharedApiService,  
    private _storageService: StorageService,
    private router: Router
  ) {   
    this.isLoading = true
    this.currentSchoolBranchId = this.sharedService.currentSchoolBranchId()
    
    this.sharedApiService.reloadAllMasterDataFromDB().pipe(take(1))
    .subscribe(
      (result: any) => {   
        this.allMasterDataLoaded(result)        
      },
      (error) => {
      }
    );    

    this.menuClickShowLoading()
  }
    
  ngOnInit() {
    this._storageService.logIn$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (isLogin) =>{
          this.isUserLogin = isLogin
      }
    )
  }

  allMasterDataLoaded(isSuccess){
    this.isLoading = false  
    this.deactivateRoute()
  }  

  // When user click on the menu and another module is loading then it will show loading animation,
  // Other user thing that nothing happen on click on menu
  menuClickShowLoading(){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.isLoadingPage = true;
      }else if(event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {
        this.isLoadingPage = false;
      }
    });
  }

  deactivateRoute() {    
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "postLoginOutlet")
        this.outlet.deactivate();
    });
  }
  
  toggleSideMenu(event){
    if(event === "profilePicUpdated"){
      // User profile pic uploaded
      this.header.profilePicPath = environment.ftpUrl+ this.sharedService.getUserProflePicDirectory() +
      this.sharedService.serializeMongoObjectId(this.sharedService.CurrentUserId()) +".png?updated="+Date.now()
    }
    else{
      this.showShideNav = !this.showShideNav
    }
  }

  schoolDdlChange(schoolId){    
    this.sharedService.currentSchoolId(schoolId)
    location.reload()
  }

  
  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 1280) {
        return true;
    } else {
        return false;
    }
  }

  openSnackBar(message: string, action: string) {
    this.sharedService.openSnackBar(message, action);
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
