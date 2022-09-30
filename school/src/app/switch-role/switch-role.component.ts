import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';
import { StorageService } from '@app/shared/services/storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SharedApiService } from '@app/shared/services/shared-api.service';

@Component({
  selector: 'app-switch-role',
  templateUrl: './switch-role.component.html',
  styleUrls: ['./switch-role.component.css']
})
export class SwitchRoleComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public user
  public currentUserRoleId = null
  public allUserRoleList = null
  public isLoading = false

  constructor(
    private sharedService: SharedService,
    private sharedApiService: SharedApiService,
    private storage: StorageService
  ) {
    this.loadAllUserRoles()
   }

  loadAllUserRoles(){
    this.isLoading = true

    this.sharedApiService.getUserRoleDdl()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(val => {
      this.allUserRoleList = val
      this.isLoading = false
    },
      error => {
        this.isLoading = false
      }
    )
  }

  ngOnInit() {
    this.user = JSON.parse(this.sharedService.loggedInData())
    this.currentUserRoleId = this.sharedService.currentUserRoleId()
  }

  roleClicked(roleId){
    this.currentUserRoleId = roleId
  }

  objectComparisonFunction(option: any, value: any): boolean {

    if (value === null || option === undefined || value === undefined) {
      return false
    }

    return option === value || option.$oid === value.$oid;
  }

  proceed() {    
    this.sharedService.currentUserRoleId(this.currentUserRoleId)
    this.storage.navigateTODashboard()
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
