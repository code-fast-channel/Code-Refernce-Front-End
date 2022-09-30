import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';
import { environment } from '@env/environment';

@Component({
  selector: 'user-small-pic',
  templateUrl: './user-small-pic.component.html',
  styleUrls: ['./user-small-pic.component.css']
})
export class UserSmallPicComponent implements OnInit {

  @Input() userId
  @Input() isRectange = false
  @Input() isMediumSize = false

  public userProfilePicDirectory
  public imageUrl

  constructor(
    public sharedService: SharedService
  ) { 
    this.userProfilePicDirectory = this.sharedService.getUserProflePicDirectory() 
  }

  ngOnInit() {
    let updateParam = (new Date()).getDay()
    this.imageUrl = environment.ftpUrl+ this.userProfilePicDirectory + this.sharedService.serializeMongoObjectId(this.userId) +'.png' + '?update=' + updateParam
  }

  imageClicked(){
    this.imageUrl = this.imageUrl + "&t="+Date.now()
  }

}
