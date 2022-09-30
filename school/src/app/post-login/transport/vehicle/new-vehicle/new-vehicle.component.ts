import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../services/vehicle.service';
import { PostLoginService } from '@app/post-login/post-login.service';

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewVehicleComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  
  @Output() public onSaveSuccess = new EventEmitter();
  @Input() initialFormValues = null
  @Input() changeModeId = null
  @Input() isViewMode = false
  
  mainForm: FormGroup = new FormGroup({})

  title = "New Vehicle"
  subTitle = "Add a new vehicle"
  isLoading = false
  isPopulatingFormDb = false
  masterData = MasterData
  open = false

  maintenanceCount: number = 0
  public userAccessPolicy

  constructor(    
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public vehicleService: VehicleService,
    private plService: PostLoginService
  ) {
      this.userAccessPolicy = this.plService.getPageEntitlements(7,2)
  }

  ngOnInit() {  

    this.setTitleMessages()
    
    this.mainForm = this.fb.group(
      {
        basicInfo: this.fb.group({}),      
        maintenance: this.fb.array([]),
      }
      )

    this.sharedService.setFormCommonFields(this.mainForm)
   
    if (this.changeModeId) {
      this.populateFromDB()
    }
  }
  
  setTitleMessages(){
    if (this.changeModeId) {
      this.title = "Update Vehicle."      
      this.subTitle = "Please update following details of vehicle."

      if (this.isViewMode) {
        this.title = "View Vehicle."
        this.subTitle = "View following details of vehicle."
      }
    }
  }

  addMaintenanceClicked() {

    this.addMaintenance()
    this.open = true // keep open the newly added maintenance
    this.sharedService.pageLevelSave("New maintenance form")
  }
  addMaintenance(id = null, status = null) {

    this.maintenanceCount = this.maintenanceCount + 1;
      (<FormArray>this.mainForm.get('maintenance'))
      .push(
          this.sharedService.setFormCommonFields(
            this.fb.group({}),
            id, status
          )
        )
  }

  removeMaintenanceClicked(idx) {
    let dialogRef = this.sharedService.openConfirmDialog()

    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.removeMaintenance(idx)
        this.sharedService.pageLevelDelete("Maintenance")
      }
    });
  }
  removeMaintenance(idx) {
    (<FormArray>this.mainForm.get('maintenance'))
      .removeAt(idx)
    this.maintenanceCount--
  }

  populateFromDB() {
    //--- Fill Vehicle information for View/Edit mode from Database

    this.isLoading = true
    this.isPopulatingFormDb = true

    this.vehicleService.getVehicle(this.changeModeId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          result.forEach(element => {
            this.initialFormValues = element
            this.mainForm.get('_id').setValue(this.initialFormValues._id)
            this.mainForm.get('status').setValue(this.initialFormValues.status)
           
            //--- Fill maintenance for View/Edit mode
            for(let idx=0; idx < (<Array<object>>element["maintenance"]).length; idx++){
              let id = ((<Array<object>>element["maintenance"])[idx])["_id"]
              let status = ((<Array<object>>element["maintenance"])[idx])["status"]
              this.addMaintenance(id, status)
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

      this.vehicleService.saveVehicle(
        this.mainForm.value,
        this.changeModeId
      )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {
            this.isLoading = false
            this.onSaveSuccess.emit(true)
            this.sharedService.openSnackBar("Vehicle's information saved Successfully.", "x", "success")
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
