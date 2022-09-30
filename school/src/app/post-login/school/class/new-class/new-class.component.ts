import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ViewEncapsulation, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClassService } from '../../services/class.service';
import { SharedApiService } from '@app/shared/services/shared-api.service';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewClassComponent implements OnInit, OnDestroy, AfterViewChecked {
  private unsubscribe$ = new Subject();
  
  @Output() public onSaveSuccess = new EventEmitter();
  @Input() changeModeId = null
  @Input() isViewMode = false
  
  mainForm: FormGroup = new FormGroup({})

  public copyFromAnotherSection = false
  public copyToSectionId = null

  title = "New Class"
  subTitle = "Add a new class"
  isLoading = false
  isPopulatingFormDb = false
  initialFormValues = null
  masterData = MasterData
  open = false
  subjectCount: number = 0

  constructor(    
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private sharedApiService: SharedApiService,
    public sharedService: SharedService,
    public classService: ClassService
  ) {}

  ngOnInit() {  

    this.setTitleMessages()
    
    this.mainForm = this.fb.group(
      {
        basicInfo: this.fb.group({}),      
        subject: this.fb.array([]),
        sectionConfig: this.fb.array([])
      }
      )

    this.sharedService.setFormCommonFields(this.mainForm)
   
    if (this.changeModeId) {
      this.populateFromDB()
    }    
  }
  
  setTitleMessages(){
    if (this.changeModeId) {
      this.title = "Update Class."      
      this.subTitle = "Please update following details of class."

      if (this.isViewMode) {
        this.title = "View Class."
        this.subTitle = "View following details of class."
      }
    }
  }

  addSubjectClicked(sectionId) {

    this.addSubject(sectionId)
    this.open = true // keep open the newly added subject
    this.sharedService.pageLevelSave("New subject form")
  }

  addSubject(sectionId, id = null, status = null) {

    let subjectForm = this.fb.group({})

    // Add section id to this subject
    subjectForm.addControl("sectionId",
        new FormControl(sectionId)
      )

    this.subjectCount = this.subjectCount + 1;
      (<FormArray>this.mainForm.get('subject'))
      .push(
          this.sharedService.setFormCommonFields(
            subjectForm,
            id, status
          )
        )
  }

  removeSubjectClicked(idx) {
    let dialogRef = this.sharedService.openConfirmDialog()

    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.removeSubject(idx)
        this.sharedService.pageLevelDelete("Subject")
      }
    });
  }

  removeSubject(idx) {
    //this.mainForm['controls'].subject['controls']
    (<FormArray>this.mainForm.get('subject'))
      .removeAt(idx)
    this.subjectCount--
  }

  copyFromAnotherSectionClicked(destinationSectionId){
    this.copyToSectionId = destinationSectionId
    this.copyFromAnotherSection = true
  }
  onCopyComplete(event){
      this.closePopUp()
  }
  closePopUp(){
    this.copyFromAnotherSection = false  
  }

  populateFromDB() {
    //--- Fill Class information for View/Edit mode from Database

    this.isLoading = true
    this.isPopulatingFormDb = true

    this.classService.getClass(this.changeModeId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          result.forEach(element => {
            this.initialFormValues = element

            this.initialFormValues.subject = this.initialFormValues.subject.filter(x => x.status === 1) 

            this.mainForm.get('_id').setValue(this.initialFormValues._id)
            this.mainForm.get('status').setValue(this.initialFormValues.status)
           
            //--- Fill subject for View/Edit mode
            for(let idx=0; idx < (<Array<object>>element["subject"]).length; idx++){
              let id = ((<Array<object>>element["subject"])[idx])["_id"]
              let status = ((<Array<object>>element["subject"])[idx])["status"]
              let sectionId = ((<Array<object>>element["subject"])[idx])["sectionId"]
              if(status == 1)
              {
                this.addSubject(sectionId, id, status)
              }
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

      this.classService.saveClass(
        this.mainForm.value,
        this.changeModeId
      )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false
            this.onSaveSuccess.emit(true)
            this.sharedService.openSnackBar("Class's information saved Successfully.", "x", "success")
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
