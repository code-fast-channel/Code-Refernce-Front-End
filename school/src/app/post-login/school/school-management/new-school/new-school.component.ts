import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { SchoolService } from '../../services/school.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-school',
  templateUrl: './new-school.component.html',
  styleUrls: ['./new-school.component.css']
})
export class NewSchoolComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  
  @Output() public onSaveSuccess = new EventEmitter();
  @Input() initialFormValues = null
  @Input() changeModeId = null
  @Input() isViewMode = false
  @Input() isSuperAdmin
  mainForm: FormGroup = new FormGroup({})

  title = "New School"
  subTitle = "Add a new school"
  isLoading = false
  isPopulatingFormDb = false
  masterData = MasterData
  open = false

  branchCount: number = 0

  constructor(    
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public schoolService: SchoolService
  ) {}

  ngOnInit() {
    this.setTitleMessages()
    
    this.mainForm = this.fb.group(
      {
        schoolBasicInfo: this.fb.group({}),
        schoolContact: this.fb.group({}),
        branch: this.fb.array([])
      }
      )

    this.sharedService.setFormCommonFields(this.mainForm, null, null)
    
    if(!this.changeModeId && !this.isViewMode){
      // Add new School Model only
      this.addBranch()
    }

    if (this.changeModeId) {
      this.populateFromDB()
    }
  }
  
  setTitleMessages(){
    if (this.changeModeId) {
      this.title = "Update School."      
      this.subTitle = "Please update following details of school."

      if (this.isViewMode) {
        this.title = "View School."
        this.subTitle = "View following details of school."
      }
    }
  }

  addBranchClicked() {

    this.addBranch()
    this.open = true // keep open the newly added branch
    this.sharedService.pageLevelSave("New branch form")
  }
  addBranch(id = null, status = null) {

    this.branchCount = this.branchCount + 1;
      (<FormArray>this.mainForm.get('branch'))
      .push(
          this.sharedService.setFormCommonFields(
            this.fb.group({}),
            id, status
          )
        )
  }

  removeBranchClicked(idx) {
    let dialogRef = this.sharedService.openConfirmDialog()

    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.removeBranch(idx)
        this.sharedService.pageLevelDelete("Branch")
      }
    });
  }
  removeBranch(idx) {
    (<FormArray>this.mainForm.get('branch'))
      .removeAt(idx)
    this.branchCount--
  }

  populateFromDB() {
    //--- Fill School information for View/Edit mode from Database

    this.isLoading = true
    this.isPopulatingFormDb = true

    this.schoolService.getSchool(this.changeModeId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          result.forEach(element => {
            this.initialFormValues = element
            this.mainForm.get('_id').setValue(this.initialFormValues._id)
            this.mainForm.get('status').setValue(this.initialFormValues.status)
           
            //--- Fill branch for View/Edit mode
            for(let idx=0; idx < (<Array<object>>element["branch"]).length; idx++){
              let id = ((<Array<object>>element["branch"])[idx])["_id"]
              let status = ((<Array<object>>element["branch"])[idx])["status"]
              this.addBranch(id, status)
            }

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

  onSubmit(event: Event) {

    this.mainForm.markAllAsTouched()
    event.preventDefault();
    event.stopPropagation();

    if (this.mainForm.valid) {
      this.isLoading = true

      this.schoolService.saveSchool(
        this.mainForm.value,
        this.changeModeId
      )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false
            this.onSaveSuccess.emit(true)
            this.sharedService.openSnackBar("School's information saved Successfully.", "x", "success")  
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
