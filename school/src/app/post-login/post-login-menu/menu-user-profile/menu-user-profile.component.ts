import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '@env/environment';
import { StorageService } from '@app/shared/services/storage.service';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-menu-user-profile',
  templateUrl: './menu-user-profile.component.html',
  styleUrls: ['./menu-user-profile.component.css']
})
export class MenuUserProfileComponent implements OnInit {

  private unsubscribe$ = new Subject();
  @Output() toggleSideMenu: EventEmitter<boolean> = new EventEmitter()

  profilePicPath: string

  constructor(
    private sharedService: SharedService,
    private plService: PostLoginService
  ) {
    this.loadUserProfilePic()
  }

  ngOnInit() {
  }

  loadUserProfilePic() {
    this.profilePicPath = environment.ftpUrl + this.sharedService.getUserProflePicDirectory() +
      this.sharedService.serializeMongoObjectId(this.sharedService.CurrentUserId()) + ".png" + "?update=" + Date.now()
  }

  closeSideMenu(value = null) {
    this.toggleSideMenu.emit(value)
  }

  onProfilePicChange(event) {
    if (event) {
      this.profilePicPath = this.profilePicPath + "?update=" + Date.now()
      this.closeSideMenu("profilePicUpdated")
    }
  }

  myProfile() {
    this.plService.navigateToMyProfile()
    this.closeSideMenu('true')
  }

}