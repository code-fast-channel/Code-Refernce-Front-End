import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from '@app/shared/services/storage.service';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '@app/shared/services/shared.service';
import { MasterData, environment } from '@env/environment';
import { PostLoginService } from '../post-login.service';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'post-login-header',
  templateUrl: './post-login-header.component.html',
  styleUrls: ['./post-login-header.component.css']
})
export class PostLoginHeaderComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  @Output() toggleSideMenu: EventEmitter<boolean> = new EventEmitter()

  showCalendar = false
  showNotificationBox = false
  showMessageBox = false
  showSettingsBox = false

  isLoading = false
  isUserLogin = true
  masterData = MasterData

  showSchoolBranchDropdown = false

  public settingsForm : FormGroup = new FormGroup({})
  public profilePicPath: string
  public hasMultipleRoles = false
  public CurrentUserId
  public currentUserRoleId

  constructor(
    private _storage: StorageService,
    private sharedService: SharedService,
    private sharedApiService: SharedApiService,
    public plService: PostLoginService
  ) {
    this.CurrentUserId = this.sharedService.CurrentUserId()
    this.currentUserRoleId = this.sharedService.currentUserRoleId()
    this.hasMultipleRoles = plService.hasMultipleRoles()
  }

  ngOnInit() {
    this._storage.logIn$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (isLogin) => {
          this.isUserLogin = isLogin
        }
      )
  }


  countMessages = 0;
  countNotifications = 10000;


  toggleMenu() {
    this.showCalendar = false
    this.closeAllNotificationBoxes()
    this.toggleSideMenu.emit(null)
  }

  logOut() {
    let dialogRef = this.sharedService.openConfirmDialog("You want to Logout.", "Yes", "No")

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._storage.logOut()
        }
      });
  }

  headerInfoBoxClicked(src) {

    this.showCalendar = false

    switch (src) {
      case 'messages': {
        this.showMessageBox = !this.showMessageBox;
        this.showNotificationBox = this.showSettingsBox = false;
        break;
      }
      case 'notifications': {
        this.showNotificationBox = !this.showNotificationBox;
        this.showMessageBox = this.showSettingsBox = false;
        break;
      }
      case 'settings': {
        this.showSettingsBox = !this.showSettingsBox;
        this.showNotificationBox = this.showMessageBox = false;
        break;
      }
    }
  }

  calendarClicked() {
    this.showCalendar = !this.showCalendar
    this.closeAllNotificationBoxes()
  }

  myProfile() {
    this.plService.navigateToMyProfile()
  }

  closeAllNotificationBoxes() {
    this.showNotificationBox = this.showMessageBox = this.showSettingsBox = false;
  }

  saveSettings() {
    this.isLoading = true

    let data = {
      "_id":  this.CurrentUserId,
      "showErrorMessages" : this.masterData.showErrorMessages,
      "outlineFields" : this.masterData.outlineFields,
      "expendMultiple" : this.masterData.expendMultiple,
      "multipleMenuOpen" : this.masterData.multipleMenuOpen,
      "formAnimation" : this.masterData.formAnimation,
      "lineChartBgColor" : this.masterData.lineChartBgColor,
      "lineChartPointRadius" : this.masterData.lineChartPointRadius,
      "websiteMainColor" : this.masterData.websiteMainColor,
      "websiteBgImage" : this.masterData.websiteBgImage
    }
    this.plService.saveUserSettings(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.sharedService.openSnackBar('Settings get saved successfully.', 'x', 'success', 5000)
          this.isLoading = false
          this.showSettingsBox = false
        },
        (error) => {
          this.isLoading = false
          console.log(error)
        }
      );
  }

  resetSettings(){
    this.isLoading = true
    let userId = this.sharedService.serializeMongoObjectId(this.CurrentUserId)
    this.plService.restoreDefaultSettings(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.sharedApiService.mapUserSettings(result)
          this.sharedService.openSnackBar('Settings restored successfully.', 'x', 'success', 5000)
          this.isLoading = false
          this.showSettingsBox = false
        },
        (error) => {
          this.isLoading = false
          console.log(error)
        }
      );
  }

  changeRole() {
    let dialogRef = this.sharedService.openConfirmDialog("You want to change the role. Any unsaved data will be removed.", "Yes", "No")

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._storage.switchRole()
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}