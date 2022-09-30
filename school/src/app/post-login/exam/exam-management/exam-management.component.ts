import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ExamListComponent } from './exam-list/exam-list.component';
import { MasterData } from '@env/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { ExamService } from '../services/exam.service';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { PostLoginService } from '@app/post-login/post-login.service';
import { CardBottomComponent } from '@app/shared/component/boxes/card-bottom/card-bottom.component';

@Component({
  selector: 'app-exam-management',
  templateUrl: './exam-management.component.html',
  styleUrls: ['./exam-management.component.css']
})
export class ExamManagementComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @ViewChild(ExamListComponent) private _ListPage: ExamListComponent
  @ViewChild('searchCard') searchCard: CardBottomComponent

  showReportCardPage = false
  showViewPage = false
  showAddChangePage = false
  showListPage = true

  showDeleteButton = false
  public editPermissions
  public ClassSectionWiseStudents
  public isTabularReportCard

  isLoading = false
  Id = null
  masterData = MasterData

  searchForm: FormGroup
  searchConfig: FieldConfig[]

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sharedApiService: SharedApiService,
    private examService: ExamService,
    private plService: PostLoginService
  ) {
    this.searchForm = this.fb.group({})
    this.editPermissions = this.plService.getPageEntitlements(9, 1) === 2
  }

  ngOnInit() {
    
    this.loadClassSubjectSectionDdl()

    this.sharedApiService.ClassSectionWiseStudents()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.ClassSectionWiseStudents = result
        },
        (error) => {
          console.log(error)
        }
      );

  }

  loadClassSubjectSectionDdl(){
    this.sharedApiService.getClassSubjectSectionDdl()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (result: any) => {        
        this.loadExamTypeDdl(result)
      },
      (error) => {
        console.log(error)
      }
    );
  }

  loadExamTypeDdl(classObject){
    this.sharedApiService.getExamTypeDdl()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (result: any) => {
        this.setSearchConfig(classObject, result)
      },
      (error) => {
        console.log(error)
      }
    );
  }

  setSearchConfig(classObject, examTypeObject) {
    this.searchConfig = [
      {
        isViewMode: false,
        type: "select",
        label: "Academic Session",
        name: "academicSessionId",
        icon: "ballot",
        options: this.masterData.academicSessions
      },
      {
        isViewMode: false,
        type: "select",
        label: "Exam type",
        name: "examTypeId",
        icon: "developer_board",
        options: examTypeObject
      },
      {
        isViewMode: false,
        type: "select",
        label: "Class",
        name: "classId",
        icon: "ballot",
        options: classObject
      }
    ];
  }

  onSearchClick() {
    this._ListPage.searchParams = this.searchForm.value
    this._ListPage.paging.pageIndex = 0
    this._ListPage.getList()
    this.searchCard.hide()
  }

  addNewClick() {
    this.Id = null
    this.showAddChangePage = true;
    this.showReportCardPage = this.showViewPage = this.showListPage = false
  }
  backToListClick() {
    this.showListPage = true;
    this.showReportCardPage = this.showViewPage = this.showAddChangePage = false
  }

  onSaveSuccess(event) {
    this.backToListClick()
    if (this._ListPage) {
      this._ListPage.getList()
    }
  }

  tabularReportCardButtonEvent(event){
    this.isTabularReportCard = true
    this.Id = event;
    this.showReportCardPage = true;
    this.showDeleteButton = this.showListPage = this.showAddChangePage = this.showViewPage = false
  }

  reportCardButtonEvent(event){
    this.isTabularReportCard = false
    this.Id = event;
    this.showReportCardPage = true;
    this.showDeleteButton = this.showListPage = this.showAddChangePage = this.showViewPage = false
  }

  viewButtonEvent(event) {
    this.Id = event;
    this.showViewPage = true;
    this.showDeleteButton = this.showListPage = this.showAddChangePage = this.showReportCardPage = false
  }

  editButtonEvent(event) {
    this.showAddChangePage = true;
    this.Id = event
    this.showDeleteButton = this.showViewPage = this.showListPage = this.showReportCardPage = false
  }

  deleteButtonEvent(event) {
    this.viewButtonEvent(event)
    this.showDeleteButton = true
  }

  deleteExamPermanently() {
    let dialogRef = this.sharedService.openConfirmDialog("You want to delete this 'Exam'?")

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (confirmed: boolean) => {
          if (confirmed) {

            this.isLoading = true

            this.examService.deleteSchoolExam(this.Id)
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe(
                (result) => {
                  this.backToListClick()
                  this._ListPage.getList()
                  this.isLoading = false
                },
                (error) => {
                  this.isLoading = false
                }
              )
          }
        },
        (error) => {
          this.isLoading = false
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
