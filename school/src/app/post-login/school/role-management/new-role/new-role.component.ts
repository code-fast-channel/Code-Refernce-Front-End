import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MasterData, defaultMenuListAndEntitlements } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { RoleService } from '../../services/role.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Output() public onSaveSuccess = new EventEmitter();
  @Input() changeModeId = null
  @Input() isViewMode = false
  @Input() showHeader = true
  @Input() childCard = false;

  mainForm: FormGroup

  title = "New Role"
  subTitle = "Add a new role"
  isLoading = false
  isPopulatingFormDb = false
  initialFormValues = null
  masterData = MasterData
  public defaultEntitlements = defaultMenuListAndEntitlements
  open = false

  stoppageCount: number = 0

  constructor(
    public fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
    public roleService: RoleService
  ) {
      this.mainForm = new FormGroup({
        entitlements: this.fb.array([])
      })

      this.defaultEntitlements.forEach(menu => {
        this.addEntitlement()
      });
   }

   addEntitlement() {
      (<FormArray>this.mainForm.get('entitlements'))
      .push(this.fb.group({}))      
  }

  ngOnInit() {
    this.setTitleMessages()
    this.sharedService.setFormCommonFields(this.mainForm)

    if (this.changeModeId) {
      this.populateFromDB()
    }
  }

  setTitleMessages() {
    if (this.changeModeId) {
      this.title = "Update Role."
      this.subTitle = "Please update following details of role."

      if (this.isViewMode) {
        this.title = "View Role."
        this.subTitle = "View following details of role."
      }
    }
  }

  populateFromDB() {
    //--- Fill Role information for View/Edit mode from Database

    this.isLoading = true
    this.isPopulatingFormDb = true

    this.roleService.getSchoolRole(this.changeModeId)
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

  onSubmit(role: Event) {
    this.mainForm.markAllAsTouched()
    role.preventDefault();
    role.stopPropagation();

    if (this.mainForm.valid) {
      this.isLoading = true

      this.roleService.saveSchoolRole(
        this.mainForm.getRawValue()
      )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result: any) => {


            if (result.isSuccess) {
              this.onSaveSuccess.emit(true)
              this.sharedService.openSnackBar(result.message, "x", "success")
              this.mainForm.reset()
            }
            else {
              this.sharedService.openSnackBar(result.message, "x", "fail")
            }

            this.isLoading = false
            
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