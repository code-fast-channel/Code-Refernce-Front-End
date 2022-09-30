import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';
import { environment, MasterData } from '@env/environment';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() userId
  @Input() firstName
  @Input() lastName
  @Input() contactNo
  @Input() email
  @Input() dob
  @Input() genderId
  @Input() registrationNo
  @Input() rollNo

  public environment = environment
  public masterData = MasterData;
  public userProfilePicDirectory = ""

  constructor(
    public sharedService: SharedService
  ) {
    this.userProfilePicDirectory = this.sharedService.getUserProflePicDirectory()
   }

  ngOnInit() {
  }

}
