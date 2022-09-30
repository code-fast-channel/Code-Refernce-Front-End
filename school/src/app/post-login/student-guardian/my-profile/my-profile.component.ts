import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public Id = null
  public isViewMode = true

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    let isStudent = MasterData.studentRoleId['$oid'] === this.sharedService.currentUserRoleId()['$oid']
    let isGuardian = MasterData.guardianRoleId['$oid'] === this.sharedService.currentUserRoleId()['$oid']

    if(isGuardian || isStudent){
      let data =  JSON.parse(this.sharedService.loggedInData())
      this.Id = this.sharedService.serializeMongoObjectId(data["_id"])
      this.isViewMode = isGuardian ? false : true
    }
  }

}
