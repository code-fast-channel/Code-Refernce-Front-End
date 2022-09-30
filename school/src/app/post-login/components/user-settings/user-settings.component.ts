import { Component, OnInit } from '@angular/core';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  masterData = MasterData
  public CurrentUserId
  public currentUserRoleId

  constructor(    
    private sharedService: SharedService
  ) {      
      this.sharedService.sortObject(this.masterData.bgImages, "name")
      this.CurrentUserId = this.sharedService.CurrentUserId()
      this.currentUserRoleId = this.sharedService.currentUserRoleId()
  }

  ngOnInit(): void {
  }  

  changeWebsiteTheme() {
    document.documentElement.style.setProperty('--main-color', this.masterData.websiteMainColor);
  }

  changeBgImage(){
    document.documentElement.style.setProperty('--main-bg-image', this.masterData.websiteBgImage)
  }

}
