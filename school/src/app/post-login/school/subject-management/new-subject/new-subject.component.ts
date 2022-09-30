import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { SubjectService } from '../../services/subject.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.css']
})
export class NewSubjectComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Output() public onSaveSuccess = new EventEmitter();
  @Input() initialFormValues = null
  @Input() changeModeId = null
  @Input() isViewMode = false
  @Input() showHeader = true
  @Input() childCard = false;

  mainForm: FormGroup = new FormGroup({})

  title = "New Subject"
  subTitle = "Add a new subject"
  isLoading = false
  isPopulatingFormDb = false
  masterData = MasterData
  open = false

  stoppageCount: number = 0

  constructor(
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public subjectService: SubjectService
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
      this.title = "Update Subject."
      this.subTitle = "Please update following details of subject."

      if (this.isViewMode) {
        this.title = "View Subject."
        this.subTitle = "View following details of subject."
      }
    }
  }

  populateFromDB() {
    //--- Fill Subject information for View/Edit mode from Database

    this.isLoading = true
    this.isPopulatingFormDb = true

    this.subjectService.getSchoolSubject(this.changeModeId)
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

  onSubmit(subject: Event) {
    this.mainForm.markAllAsTouched()
    subject.preventDefault();
    subject.stopPropagation();

    if (this.mainForm.valid) {
      this.isLoading = true

      this.subjectService.saveSchoolSubject(
        this.mainForm.getRawValue()
      )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false
            this.onSaveSuccess.emit(true)
            this.sharedService.openSnackBar("Subject's information saved Successfully.", "x", "success")
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

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
