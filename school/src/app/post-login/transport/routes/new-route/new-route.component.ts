import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { RouteService } from '../../services/route.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.css']
})
export class NewRouteComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  
  @Output() public onSaveSuccess = new EventEmitter();
  @Input() initialFormValues = null
  @Input() changeModeId = null
  @Input() isViewMode = false
  @Input() showHeader = true
  @Input() childCard = false
  
  mainForm: FormGroup = new FormGroup({})

  title = "New Route"
  subTitle = "Add a new route"
  isLoading = false
  isPopulatingFormDb = false
  masterData = MasterData
  open = false

  stoppageCount: number = 0

  constructor(    
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public routeService: RouteService
  ) {}

  ngOnInit() {  

    this.setTitleMessages()
    
    this.mainForm = this.fb.group(
      {
        basicInfo: this.fb.group({}),        
        stoppage: this.fb.array([]),
      }
      )

    this.sharedService.setFormCommonFields(this.mainForm)
   
    if (this.changeModeId) {
      this.populateFromDB()
    }
  }
  
  setTitleMessages(){
    if (this.changeModeId) {
      this.title = "Update Route."      
      this.subTitle = "Please update following details of route."

      if (this.isViewMode) {
        this.title = "View Route."
        this.subTitle = "View following details of route."
      }
    }
  }

  addStoppageClicked() {

    this.addStoppage()
    this.open = true // keep open the newly added stoppage
    this.sharedService.pageLevelSave("New stoppage form")
  }
  addStoppage(id = null, status = null) {

    this.stoppageCount = this.stoppageCount + 1;
      (<FormArray>this.mainForm.get('stoppage'))
      .push(
          this.sharedService.setFormCommonFields(
            this.fb.group({}),
            id, status
          )
        )
  }

  removeStoppageClicked(idx) {
    let dialogRef = this.sharedService.openConfirmDialog()

    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.removeStoppage(idx)
        this.sharedService.pageLevelDelete("Stoppage")
      }
    });
  }
  removeStoppage(idx) {
    (<FormArray>this.mainForm.get('stoppage')).removeAt(idx)
    this.stoppageCount--;
  }    

  stoppageValueChanged(event){
    this.calculateRouteLength()
  }

  calculateRouteLength() {
    let totalDistance = 0;

    (<FormArray>this.mainForm.get("stoppage")).controls.forEach(stoppage => {
      try{
          let stoppageDistance = parseInt(stoppage.get("distance").value)
          if(stoppageDistance > 0){
            totalDistance = totalDistance + stoppageDistance
          }
      }
      catch(ex){
        // invalid distance value
      }
    });

    let routeLengthControl = this.mainForm.get("basicInfo").get("routeLength")
    routeLengthControl && routeLengthControl.setValue(totalDistance)
  }

  populateFromDB() {
    //--- Fill Route information for View/Edit mode from Database

    this.isLoading = true
    this.isPopulatingFormDb = true

    this.routeService.getRoute(this.changeModeId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          result.forEach(element => {
            this.initialFormValues = element
            this.mainForm.get('_id').setValue(this.initialFormValues._id)
            this.mainForm.get('status').setValue(this.initialFormValues.status)

            //--- Fill stoppage for View/Edit mode
            for(let idx=0; idx < (<Array<object>>element["stoppage"]).length; idx++){
              let id = ((<Array<object>>element["stoppage"])[idx])["_id"]
              let status = ((<Array<object>>element["stoppage"])[idx])["status"]
              this.addStoppage(id, status)
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

      this.routeService.saveRoute(
        this.mainForm.getRawValue(),
        this.changeModeId
      )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false
            this.onSaveSuccess.emit(true)
            this.sharedService.openSnackBar("Route's information saved Successfully.", "x", "success")
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
