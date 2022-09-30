import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectorRef, AfterViewChecked, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterData, environment } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { StudentRatingService } from '../../services/student-rating.service';
import { PostLoginService } from '@app/post-login/post-login.service';
import { CardBottomComponent } from '@app/shared/component/boxes/card-bottom/card-bottom.component';

@Component({
  selector: 'app-mark-student-rating',
  templateUrl: './mark-student-rating.component.html',
  styleUrls: ['./mark-student-rating.component.css']
})
export class MarkStudentRatingComponent implements OnInit, AfterViewChecked, OnDestroy {
  private unsubscribe$ = new Subject();
  @ViewChild('searchCard') searchCard: CardBottomComponent

  @Input() loading = false
  @Input() public open = true
  @Input() public stayOnPage = true

  mainForm: FormGroup = new FormGroup({})
  searchForm: FormGroup = new FormGroup({})

  environment = environment
  masterData = MasterData

  isPopulatingFormDb = false
  initialFormValues = null

  public ratingStatusCount = {}
  public editPermissions
  public selectedStudentId
  public isViewAllRating
  public searchParams

  rating = null

  title = "Add Employee Details."
  subTitle = "Please provide following details of employee."

  constructor(
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public studentRatingService: StudentRatingService,
    private plService: PostLoginService
  ) {
    this.editPermissions = this.plService.getPageEntitlements(3, 1) === 2
    this.initializeRatingCounts()
  }

  initializeRatingCounts() {
    this.ratingStatusCount["veryBad"] = 0
    this.ratingStatusCount["bad"] = 0
    this.ratingStatusCount["satisfied"] = 0
    this.ratingStatusCount["good"] = 0
    this.ratingStatusCount["excellent"] = 0
  }

  ngOnInit(): void {
  }

  searchRating() {
    this.loading = true
    
    this.searchParams = this.searchForm.value

    this.searchParams["classId"] = this.sharedService.serializeMongoObjectId(this.searchParams["classId"])
    this.searchParams["subjectId"] = this.sharedService.serializeMongoObjectId(this.searchParams["subjectId"])

    this.studentRatingService.getClassSectionRating(this.searchParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {

          this.isPopulatingFormDb = false
          this.loading = false

          this.rating = result
          this.ratingCount()
        },
        (error) => {
          this.isPopulatingFormDb = false
          this.loading = false
          console.log(error)
        }
      );
  }

  onSearchClick() {

    this.searchForm.markAllAsTouched()

    if (this.searchForm.valid) {
      this.searchCard.hide();
      this.searchRating()
    }

  }

  ratingValueChanged(idx, ratingValue) {
    this.rating[idx]["ratingValue"] = ratingValue
    this.ratingCount();
  }

  ratingCount() {
    this.initializeRatingCounts()

    this.rating.forEach(stu => {
      switch (stu["ratingValue"]) {
        case 1: {
          this.ratingStatusCount["veryBad"] = this.ratingStatusCount["veryBad"] + 1;
          break;
        }
        case 2: {
          this.ratingStatusCount["bad"] = this.ratingStatusCount["bad"] + 1;
          break;
        }
        case 3: {
          this.ratingStatusCount["satisfied"] = this.ratingStatusCount["satisfied"] + 1;
          break;
        }
        case 4: {
          this.ratingStatusCount["good"] = this.ratingStatusCount["good"] + 1;
          break;
        }
        case 5: {
          this.ratingStatusCount["excellent"] = this.ratingStatusCount["excellent"] + 1;
          break;
        }
      }
    });
  }

  saveRating() {

    this.loading = true

    this.studentRatingService.saveRating(this.makeRating())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.loading = false
          this.sharedService.openSnackBar("Rating get saved Successfully.", "x", "success")
          this.mainForm.reset()
        },
        (error) => {
          this.loading = false
          this.sharedService.openSnackBar("Rating not get saved.", "x", "fail")
          console.log(error)
        }
      );
  }

  makeRating() {
    let manualRating: Map<Number, Array<object>> = new Map<number, Array<object>>()

    this.rating.forEach(stu => {

      if (!manualRating.get(stu["sectionId"])) {
        manualRating.set(stu["sectionId"], new Array<object>())
      }

      manualRating.get(stu["sectionId"])
        .push(
          {
            "studentId": stu["studentId"],
            "ratingValue": stu["ratingValue"]
          }
        )
    });

    let RatingModel = {
      "_id": this.rating[0]["_id"],
      "ratingDate": "000000000",
      "status": 1,
      "classes": []
    }

    //-------- populate section wise rating
    for (let idx = 0; idx < 10; idx++) {

      if (manualRating.get(idx)) {
        RatingModel.classes.push(
          {
            "classId": this.searchForm.get("classId").value,
            "subjectId": this.searchForm.get("subjectId").value,
            "sectionId": idx,
            "students": manualRating.get(idx)
          }
        )
      }
    }

    return RatingModel
  }

  viewAllRatingClicked(stuId){
    this.selectedStudentId = stuId
    this.isViewAllRating = true
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}