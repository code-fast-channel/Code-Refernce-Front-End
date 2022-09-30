import { Component, OnInit, Input } from '@angular/core';
import { MasterData } from '@env/environment';

@Component({
  selector: 'guardian-info',
  templateUrl: './guardian-info.component.html',
  styleUrls: ['./guardian-info.component.css']
})
export class GuardianInfoComponent implements OnInit {

  @Input() guardian
  @Input() idxGuardian
  @Input() initialFormValues
  @Input() guardianSubTitle
  @Input() focusId
  @Input() isViewMode
  @Input() changeModeId
  @Input() canSeeSensitiveInfo
  @Input() editPermissions
  @Input() isComingFromMyProfile

  public masterData = MasterData
  
  constructor() { }

  ngOnInit(): void {
  }

}
