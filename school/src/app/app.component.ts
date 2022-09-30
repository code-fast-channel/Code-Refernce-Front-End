
import { StorageService } from './shared/services/storage.service';
import { SharedService } from './shared/services/shared.service';
import { environment, MasterData } from '@env/environment';
import { OnInit, Component, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { PWAService } from './pwa.service';
import { VersionCheckService } from './shared/services/version-check.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Google map key = AIzaSyAsyYs2TTXkkOnDi9C58rsUzmOZIheqsf4

  public masterData = MasterData
  public lat: number = -23.8779431;
  public lng: number = -49.8046873;
  public zoom: number = 18;

  constructor(
    private versionCheckService: VersionCheckService,
    private breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
    private router: Router,
    private pwaService: PWAService
  ) {

    // Register for push notifications
    this.pwaService.subscribeToNotifications()

    /* Uncomment this if you want to reload page when user select same url

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    */

    /* Popup before refresh/leave page
   window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";
    e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
    return confirmationMessage;              // Gecko, WebKit, Chrome <34
    });

    */

    this.router.navigateByUrl("/public/guest");
  }

  public ngOnInit(): void {
    this.versionCheckService.initVersionCheck(environment.apiUrl + "api/appSetUp/versioncheck");
    this.detectScreenSize()
  }


  openSnackBar(message: string, action: string) {
    this.sharedService.openSnackBar(message, action);
  }

  isUserLoggedIn(): boolean {

    let loggedInUser = this.sharedService.loggedInData()

    if (loggedInUser) {
      return true;
    }

    return false
  }

  detectScreenSize() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {

      //reset all screen size first
      this.masterData.ScreenSize.isXSmall = false
      this.masterData.ScreenSize.isSmall = false
      this.masterData.ScreenSize.isMedium = false
      this.masterData.ScreenSize.isLarge = false
      this.masterData.ScreenSize.isXLarge = false


      if (result.breakpoints[Breakpoints.XSmall]) {
        this.masterData.ScreenSize.isXSmall = true
      }
      if (result.breakpoints[Breakpoints.Small]) {
        this.masterData.ScreenSize.isSmall = true
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.masterData.ScreenSize.isMedium = true
      }
      if (result.breakpoints[Breakpoints.Large]) {
        this.masterData.ScreenSize.isLarge = true
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.masterData.ScreenSize.isXLarge = true
      }
    });
  }
}
