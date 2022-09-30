import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { FormGroup } from '@angular/forms';
import { SharedService } from '@app/shared/services/shared.service';
import { PostLoginService } from '@app/post-login/post-login.service';
import { DashboardService } from '../services/dashboard.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']
})
export class NoticeBoardComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public fieldsConfig: FieldConfig[]

  hide = true;
  isLoading = false

  public mainForm: FormGroup = new FormGroup({})
  public editPermissions = false
  public masterData = MasterData

  constructor(
    private sharedService: SharedService,
    private plService: PostLoginService,
    private dashboardService: DashboardService
  ) {
    this.editPermissions = this.plService.getPageEntitlements(1, 2) === 2
    this.fetchNoticeBoard()
  }

  ngOnInit() { }

  setupNoticeConfig(data){    
    console.log(data)
    this.fieldsConfig = [
      {
        isViewMode: !this.editPermissions,
        type: "richTextBox",
        label: "",
        inputType: "richTextBox",
        name: "notice",
        value: data,
        validations: [validationType.required()]
      }
    ]
  }

  fetchNoticeBoard(){
    this.isLoading = true

    this.dashboardService.getNoticeBoard()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result) => {          
          console.log(result)
          this.isLoading = false

          let data = result[0]? result[0]["notice"] : null
          this.setupNoticeConfig(data)
        },
        (error) => {          
          this.isLoading = false
          this.sharedService.openSnackBar("Sorry! Notice Board didn't get fetched.", "x", "fail")
        }
      )
  }


  onSubmit(event) {
    this.mainForm.markAllAsTouched()
    event.preventDefault();
    event.stopPropagation();

    if (this.mainForm.valid) {
      this.isLoading = true;
      this.dashboardService.saveNoticeBoard(this.mainForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result) => {          
          this.isLoading = false
          this.sharedService.openSnackBar("Notice Board get saved successfully.", "x", "success")
        },
        (error) => {
          this.isLoading = false
          this.sharedService.openSnackBar("Sorry! Notice Board didn't get saved.", "x", "fail")
        }
      )
    }
    else {
      this.sharedService.openSnackBar("Please enter something in message or notice.", "x", "fail")
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
