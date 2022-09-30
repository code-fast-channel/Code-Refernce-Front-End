import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { StudentListComponent } from '../student-list/student-list.component';
import { FieldConfig } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '@app/shared/services/shared.service';
import { StudentGuardianService } from '../services/student-guardian.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostLoginService } from '@app/post-login/post-login.service';
import { CardBottomComponent } from '@app/shared/component/boxes/card-bottom/card-bottom.component';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit, OnDestroy {
  
  private unsubscribe$ = new Subject();

  @ViewChild(StudentListComponent) private _ListPage : StudentListComponent
  @ViewChild('searchCard') searchCard : CardBottomComponent
  
  showViewPage = false
  showAddChangePage = false
  showListPage = true

  public editPermissions = false
  isLoading = false
  Id = null
  focusId = null
  masterData = MasterData

  searchForm: FormGroup
  searchConfig: FieldConfig[] = [
    {
      isViewMode: false,
      type: "input",
      label: "First Name",
      inputType: "text",
      name: "firstName",
      icon: "accessibility_new"
    },
    {
      isViewMode: false,
      type: "input",
      label: "Last Name",
      inputType: "text",
      name: "lastName",
      icon: "accessibility"
    },
    {
      isViewMode: false,
      type: "date",
      label: "DOB",
      name: "dob"
    },
    {
      isViewMode: false,
      type: "select",
      label: "Gender",
      name: "genderId",      
      options: this.masterData.genders
    },
    {
      isViewMode: false,
      type: "select",
      label: "Religion",
      name: "religionId",
      options: this.masterData.religions
    },
    {
      isViewMode: false,
      type: "select",
      label: "Cast",
      name: "castId",
      options: this.masterData.casts
    }
  ];


  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private studentGuardianService: StudentGuardianService,
    private plService: PostLoginService
  ) {
    this.searchForm = this.fb.group({})
    this.editPermissions = this.plService.getPageEntitlements(4,1) == 2
  }

  ngOnInit() {
  }

  onSearchClick(){
    this._ListPage.searchParams = this.searchForm.value
    this._ListPage.paging.pageIndex=0
    this._ListPage.getList()
    this.searchCard.hide()
  }

  addNewClick(){
    this.Id = null
    this.showAddChangePage = true;
    this.showViewPage = this.showListPage = false
  }
  backToListClick(){
    this.showListPage = true;
    this.showViewPage = this.showAddChangePage = false
  }

  onSaveSuccess(event) {
    this.backToListClick()
    if(this._ListPage){
      this._ListPage.getList()
    }
  }

  viewButtonEvent(event){  
    this.Id = event.id;
    this.focusId = event.focusId
    this.showViewPage = true;
    this.showListPage = this.showAddChangePage = false
  }

  editButtonEvent(event){
    this.showAddChangePage = true;
    this.Id = event.id;
    this.focusId = event.focusId
    this.showViewPage = this.showListPage = false
  }

  deleteClicked(id){
    let dialogRef = this.sharedService.openConfirmDialog("You want to delete this 'Student Guardian hierarchy'?")

    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (confirmed: boolean) => {
      if (confirmed) {        
        
        this.isLoading = true

        this.studentGuardianService.deleteStudentGuardian(id)
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
