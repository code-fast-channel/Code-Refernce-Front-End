import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-copy-subject',
  templateUrl: './copy-subject.component.html',
  styleUrls: ['./copy-subject.component.css']
})
export class CopySubjectComponent implements OnInit {

  @Output() public onSuccess = new EventEmitter();

  @Input() mainForm: FormGroup
  @Input() sectionId

  public classSections
  public masterData = MasterData
  public fromSectionId

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.fromSectionId = null
    this.classSections = this.mainForm.get("basicInfo").get("classSection").value
  }

  copyClicked(fromSectionId) {
    this.fromSectionId = fromSectionId
  }

  proceed(){
    let copiedSubject = new FormArray([])

    let currentSubject = <FormArray>this.mainForm.get("subject")

    currentSubject.controls.forEach(subject => {
      if (subject.get("sectionId").value === this.fromSectionId) {

        let control = this.sharedService.copyFormControl(subject)

        control.get("sectionId").setValue(this.sectionId)
        control.get("_id").setValue(this.sharedService.generateMongoObjectId())

        copiedSubject.push(control)
      }
    });

    copiedSubject.controls.forEach(element => {
      currentSubject.push(element)
    });

    this.onSuccess.emit(true)
  }

  dontCopyClicked() {
    this.onSuccess.emit(false)
  }

}
