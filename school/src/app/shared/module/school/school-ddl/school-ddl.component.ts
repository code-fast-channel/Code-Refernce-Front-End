import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from '@app/shared/services/storage.service';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '@app/shared/services/shared.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-school-ddl',
  templateUrl: './school-ddl.component.html',
  styleUrls: ['./school-ddl.component.css']
})
export class SchoolDdlComponent implements OnInit, OnDestroy {
  
  @Output() onChange : EventEmitter<any> = new EventEmitter<any>()

  private unsubscribe$ = new Subject();

  currentSchoolId: any
  dataSource: object

  constructor(
    private storageService: StorageService,
    private sharedService: SharedService,
    private _http: HttpClient
  ) {}

  isSuperAdmin() {    
    console.log('isSuperAdmin');    
    return this.sharedService.currentUserRoleId() === 0
  }

  schoolDDL(searchParam = null){
    let headers = this.sharedService.generateHttpHeader()    
    let params = new HttpParams().append("searchParams",searchParam)
   return this._http.get(environment.apiUrl+"schools", {headers: headers, params:params})
  }

  ngOnInit() {
    if(this.isSuperAdmin()) {
      this.schoolDDL()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          this.dataSource = data
          if(!this.sharedService.currentSchoolId())
          {
            this.currentSchoolId = this.sharedService.currentSchoolId(data[0]["id"])
          }
          else{
            this.currentSchoolId = this.sharedService.currentSchoolId()
          }
        }
      )
    }
  }

  schoolChanged(value) {
    this.currentSchoolId = value
    this.onChange.emit(value)
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
