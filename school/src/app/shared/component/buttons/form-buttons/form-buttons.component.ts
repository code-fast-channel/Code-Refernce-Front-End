import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '@app/shared/services/shared.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MasterData } from '@env/environment';

@Component({
  selector: 'form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.css']
})
export class FormButtonsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Output() onReset = new EventEmitter()

  @Input() iconSave = "save"
  @Input() form: FormGroup
  @Input() isChangeMode = false
  @Input() isSearchForm = false
  @Input() saveLabel: string = "Save"
  @Input() resetLabel: string = "Reset"
  @Input() resetMessage: string = "Are you sure, you want to remove all data from Form?"
  @Input() resetButtonNeeded = true
  @Input() topMargin = true

  pageLoadForm: FormGroup

  public masterData = MasterData

  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit() {

    if (this.isChangeMode && this.saveLabel === "Save") {
      this.saveLabel = "Update"
    }

    if (this.isSearchForm) {
      this.iconSave = "search"
      this.saveLabel = "Search"
      this.resetLabel = "Clear"
    }
  }

  resetFormClicked() {

    // Can't use the Form.Reset, because it will remove the controls as well
    // But we only needs to reset the values of controls
    if(this.isSearchForm){
      this.resetMessage = "You want to clear the search criteria?"
    }

    let dialogRef = this.sharedService.openConfirmDialog(this.resetMessage)

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.sharedService.resetFormControls(this.form)
          this.sharedService.openSnackBar("Form reset successfully", "x", "warning", 2000)    
          this.onReset.emit(true)      
        }        
      });
  }
  

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
