import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { environment, MasterData } from '@env/environment';
import { SharedRatingService } from '../shared-rating.service';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { CardBottomComponent } from '@app/shared/component/boxes/card-bottom/card-bottom.component';

@Component({
  selector: 'app-student-whole-rating',
  templateUrl: './student-whole-rating.component.html',
  styleUrls: ['./student-whole-rating.component.css']
})
export class StudentWholeRatingComponent implements OnInit, OnDestroy {
  @ViewChild('searchCard') searchCard: CardBottomComponent
  
  private unsubscribe$ = new Subject();

  @Input() studentId

  public searchForm: FormGroup = new FormGroup({})
  public environment = environment
  public masterData = MasterData;
  public isLoading
  public dbResult
  public ratings
  public isNoRecordFound

  constructor(
    private sharedRatingService: SharedRatingService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getStudentWholeRating()
  }

  getRatingSearchObject() {

    if (!this.studentId.$oid) {
      this.studentId = this.sharedService.generateMongoObjectId(this.studentId)
    }

    let obj = {
      "studentId": this.studentId
    }
    return obj
  }

  getStudentWholeRating() {

    let ratingSearch = this.getRatingSearchObject()

    this.isLoading = true
    this.sharedRatingService.getStudentwholeRating(ratingSearch)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.isLoading = false;

          result.forEach(element => {
            this.dbResult = element
            this.filterRatings()
          });
        },
        (error) => {
          this.isLoading = false
          console.log(error)
        }
      );

  }

  onSearchClick() {
    this.filterRatings(
      this.searchForm.get('classId').value, 
      this.searchForm.get('subjectId').value,
      this.searchForm.get('ratingId').value,
      this.searchForm.get('fromDate').value,
      this.searchForm.get('toDate').value
      )

      this.searchCard.hide();
  }

  filterRatings(classId = null, subjectId = null, ratingValue = null, fromDate = null, toDate = null) {
    this.ratings = this.dbResult.ratings

    if (classId) {
      classId = classId['$oid'] ? classId['$oid'] : classId
      this.ratings = this.ratings.filter(x => x.classId['$oid'] === classId)
    }

    if (subjectId) {
      subjectId = subjectId['$oid'] ? subjectId['$oid'] : subjectId
      this.ratings = this.ratings.filter(x => x.subjectId['$oid'] === subjectId)
    }

    if (ratingValue) {
      this.ratings = this.ratings.filter(x => x.ratingValue === ratingValue)
    }

    if(fromDate){
      this.ratings = this.ratings.filter(x => x.ratingDate >= fromDate)
    }

    if(toDate){
      this.ratings = this.ratings.filter(x => x.ratingDate <= toDate)
    }

    this.ratings = this.sharedService.sortObject(this.ratings, 'ratingDate', true)
    this.ratings = this.sharedService.GroupBy(this.ratings, 'ratingDate', 'subjects')
    this.isNoRecordFound = this.ratings && this.ratings.length > 0 ? false : true
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
