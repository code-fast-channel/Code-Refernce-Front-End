import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { ExamService } from '../../services/exam.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Output() public onSaveSuccess = new EventEmitter();
  @Input() initialFormValues = null
  @Input() changeModeId = null
  @Input() isViewMode = false
  @Input() showHeader = true
  @Input() childCard = false;
  @Input() ClassSectionWiseStudents = null  // Class section wise student list, Will be used only when creating new Exam

  mainForm: FormGroup = new FormGroup({})

  title = "New Exam"
  subTitle = "Add a new exam"
  isLoading = false
  isPopulatingFormDb = false
  masterData = MasterData
  open = false

  stoppageCount: number = 0

  constructor(
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public examService: ExamService
  ) { }

  ngOnInit() {
    this.setTitleMessages()
    this.sharedService.setFormCommonFields(this.mainForm)

    if (this.changeModeId) {
      this.populateFromDB()
    }
  }

  setTitleMessages() {
    if (this.changeModeId) {
      this.title = "Update Exam."
      this.subTitle = "Please update following details of exam."

      if (this.isViewMode) {
        this.title = "View Exam."
        this.subTitle = "View following details of exam."
      }
    }
  }

  populateFromDB() {
    //--- Fill Exam information for View/Edit mode from Database

    this.isLoading = true
    this.isPopulatingFormDb = true

    this.examService.getSchoolExam(this.changeModeId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          result.forEach(element => {
            this.initialFormValues = element
            this.mainForm.get('_id').setValue(this.initialFormValues._id)
            this.mainForm.get('status').setValue(this.initialFormValues.status)
          });

          this.isLoading = false
          this.isPopulatingFormDb = false
        },
        (error) => {
          this.isLoading = false
          this.isPopulatingFormDb = false
          console.log(error)
        }
      );
  }

  confirmSubmit(exam: Event) {

    // In edit mode only, take the confirmation before saving the exam details.

    if (this.changeModeId) {
      let dialogRef = this.sharedService.openConfirmDialog("You want to Update the Exam results of all the subject and the exam info ?")

      dialogRef.afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (confirmed: boolean) => {
            if (confirmed) {
              this.onSubmit(exam)
            }
          },
          (error) => {
            this.isLoading = false
          }
        );
    }
    else {
      this.onSubmit(exam)
    }
  }

  onSubmit(exam: Event) {
    this.mainForm.markAllAsTouched()
    exam.preventDefault();
    exam.stopPropagation();

    if (this.mainForm.valid) {
      this.isLoading = true

      this.examService.saveSchoolExam(
        this.mainForm.getRawValue()
      )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false
            this.onSaveSuccess.emit(true)
            this.sharedService.openSnackBar("Exam's information saved Successfully.", "x", "success")
            this.mainForm.reset()
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

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  loadClassWiseStudents() {

  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
