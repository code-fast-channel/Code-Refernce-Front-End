import { Component, OnInit, Input } from '@angular/core';
import { MasterData } from '@env/environment';

@Component({
  selector: 'student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  @Input() student
  @Input() idxStudent
  @Input() initialFormValues
  @Input() studentSubTitle
  @Input() focusId
  @Input() isViewMode
  @Input() changeModeId
  @Input() canSeeSensitiveInfo
  @Input() editPermissions
  @Input() isComingFromMyProfile
  
  public masterData = MasterData
  public isViewRating
  public selectedStudentId

  constructor() { }

  ngOnInit(): void {
  }  

  viewStudentRatings(){    
    this.selectedStudentId = this.student.get('_id').value
    this.isViewRating = true
  }

}
