import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MasterData, environment } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { StudentService } from '../services/student.service';
import { PostLoginService } from '@app/post-login/post-login.service';
import {Sort} from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @Output() viewButtonEvent = new EventEmitter()
  @Output() editButtonEvent = new EventEmitter()

  @Input() pageTitle: string = ""
  @Input() roleId: number

  currentTime = Date.now()

  isLoading = false;

  public editPermissions = false

  environment = environment
  masterData = MasterData;
  students = [];

  selectedStudentId
  isViewRating = false

  searchParams = null
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  sortParams = {
    fieldName: " basicInfo.firstName",
    isAsc: true
  }

  constructor(
    private studentService: StudentService,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    private plService: PostLoginService
  ) {
    this.editPermissions = this.plService.getPageEntitlements(4,1) === 2  
  }

  ngOnInit() {
    this.getList()
  }

  getList() {
    this.isLoading = true;

    let SearchObject = {
      SearchParameters: this.searchParams,
      paging: {
        "pageIndex": this.paging.pageIndex,
        "pageSize": this.paging.pageSize
      },
      sorting: {
        "fieldName": this.sortParams.fieldName,
        "isAsc": this.sortParams.isAsc
      }
    }

    this.studentService
      .getStudentList(SearchObject)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.isLoading = false
          this.students = result.data
          this.paging.length = result.count
        },
        (error) => {
          this.isLoading = false
          console.log(error)
        }
      );
  }

  ratingClicked(id) {
    this.selectedStudentId = id
    this.isViewRating = true
  }

  viewClicked(id, stuId) {
    let idObj = {
      id : id,
      focusId : stuId
    }
    this.viewButtonEvent.emit(idObj)
  }

  editClicked(id, stuId) {
    let idObj = {
      id : id,
      focusId : stuId
    }
    this.editButtonEvent.emit(idObj)
  }

  sortClicked(sort: Sort) {
    this.paging.pageIndex = 0
    this.sortParams.fieldName = sort.active
    this.sortParams.isAsc = sort.direction === 'asc'
    this.getList()
    this.changeDetector.detectChanges();
  }

  pagingClicked(paginator: PageEvent) {
    this.paging.pageIndex = paginator.pageIndex
    this.paging.pageSize = paginator.pageSize
    this.getList();
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
