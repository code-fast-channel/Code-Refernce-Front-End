import { Component, OnInit, OnDestroy, Output, Input, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { HolidayService } from '../../services/holiday.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-holiday',
  templateUrl: './new-holiday.component.html',
  styleUrls: ['./new-holiday.component.css']
})
export class NewHolidayComponent implements OnInit , OnDestroy {
  private unsubscribe$ = new Subject();

  @Output() public onSaveSuccess = new EventEmitter();
  @Input() initialFormValues = null
  @Input() changeModeId = null
  @Input() isViewMode = false
  @Input() showHeader = true
  @Input() childCard = false;

  mainForm: FormGroup = new FormGroup({})

  title = "New Holiday"
  subTitle = "Add a new holiday"
  isLoading = false
  isPopulatingFormDb = false
  masterData = MasterData
  open = false

  stoppageCount: number = 0

  constructor(
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public holidayService: HolidayService
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
      this.title = "Update Holiday."
      this.subTitle = "Please update following details of holiday."

      if (this.isViewMode) {
        this.title = "View Holiday."
        this.subTitle = "View following details of holiday."
      }
    }
  }

  populateFromDB() {
    //--- Fill Holiday information for View/Edit mode from Database

    this.isLoading = true
    this.isPopulatingFormDb = true

    this.holidayService.getSchoolHoliday(this.changeModeId)
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

  onSubmit(holiday: Event) {
    this.mainForm.markAllAsTouched()
    holiday.preventDefault();
    holiday.stopPropagation();

    if (this.mainForm.valid) {
      this.isLoading = true

      this.holidayService.saveSchoolHoliday(
        this.mainForm.getRawValue()
      )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false
            this.onSaveSuccess.emit(true)
            this.sharedService.openSnackBar("Holiday's information saved Successfully.", "x", "success")
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

