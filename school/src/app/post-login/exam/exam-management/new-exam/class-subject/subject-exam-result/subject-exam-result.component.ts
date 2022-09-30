import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { PostLoginService } from '@app/post-login/post-login.service';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { ExamService } from '@app/post-login/exam/services/exam.service';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-subject-exam-result',
  templateUrl: './subject-exam-result.component.html',
  styleUrls: ['./subject-exam-result.component.css']
})
export class SubjectExamResultComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  
  @ViewChild('stumarksGainedTextBoxRef') stumarksGainedTextBoxRef: ElementRef;

  @Input() form: FormArray
  @Input() initialFormValues = null
  @Input() studentDetails     // This will be used only in case of update to show the student names
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  @Input() subject : FormGroup
  @Input() examId

  public editPermissions = false
  public isLoading = false
  public title = "View Exam Result"
  public subTitle = "View student marksheet for this subject"

  public masterData = MasterData
  public sections = []
  public showResult = false
  public subjectId
  public showExamResult

  constructor(
    private plService: PostLoginService,
    public sharedService: SharedService,
    private examService: ExamService,
    private fb: FormBuilder
  ) {
    this.editPermissions = this.plService.getPageEntitlements(9, 1) === 2
  }

  ngOnInit() {

    this.subjectId = this.subject.get("subjectId").value

    this.computeClassSections()
    
    if (this.isViewMode) {
      this.form.disable()
    }
  }

  computeClassSections(){
    this.form.controls.forEach(sec => {
      this.sections.push(sec.get('sectionId').value)
    });

    this.sections.sort();
  }

  saveSectionResult(sectionId) {
    this.form.markAllAsTouched()

    if (this.form.valid) {
      this.isLoading = true

      let sectionResult = null

      this.form.controls.forEach(element => {
        if (element.get('sectionId').value === sectionId) {
          sectionResult = element.value
        }
      });

      let data = {
        sectionResult: sectionResult,
        subjectId: this.sharedService.serializeMongoObjectId(this.subjectId),
        examId: this.sharedService.serializeMongoObjectId(this.examId)
      }

      let finalData = JSON.parse(JSON.stringify(data))
      this.examService.saveSpecificSubjectSectionExamResult(finalData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false
            let sectionName = this.masterData.classSections.find(x => x.id === sectionId).name
            this.sharedService.openSnackBar("Section-"+sectionName+" result get saved Successfully.", "x", "success")
            this.showExamResult = false
          },
          (error) => {
            this.isLoading = false
            console.log(error)
          }
        );
    } else {
      this.sharedService.openSnackBar("Some fields are invalid. Please fill them properly.", "x", "fail")
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
