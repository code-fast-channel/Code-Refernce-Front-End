import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, MasterData } from '@env/environment';
import { Subject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedApiService {
  private alreadyLoading = 'Loading'

  private allSchoolBranchList
  private allEmployeeList
  private allSubjectList
  private allExamTypeList
  private allUserRoleList
  private allClassList
  private allClassSubjectSectionList

  /**
   * This service call the common api methods which can be used among multiple modules.
   * For eg. List of teachers, class ddl etc.
   */

  environment = environment
  constructor(
    private http: HttpClient
  ) {
      this.resetDbMasterData()
   }

  public resetDbMasterData(){
    this.allEmployeeList = {
      teacher : null,
      driver: null,
      conductor: null
    }

    this.allSchoolBranchList = null
    this.allSubjectList = null
    this.allUserRoleList = null
    this.allClassList = null
    this.allClassSubjectSectionList = null
  }

  /**** Some common lists which can be used any where */

  /** School Events */
  getSchoolEventByDate(agendaDate) {
    return this.http.get(environment.apiUrl + "api/event/" + "getSchoolEventByDate?agendaDate=" + agendaDate)
  }

  /** School Holidays By Date range */
  getSchoolHolidayByDateRange(startDate, endDate) {
    return this.http.get(environment.apiUrl + "api/holiday/" + "getSchoolHolidayByDateRange?startDate=" + startDate + "&endDate=" + endDate)
  }


  /*************************************************************************************************
   * Here we manage Will manage the master data for whole application, which is present in Database.
   ************************************************************************************************/

  reloadAllMasterDataFromDB(){
    let notifier = new Subject()

    this.resetDbMasterData()
    
    this.http.get(environment.apiUrl + "api/appSetUp/getAllMasterData")
        .pipe(take(1))
        .subscribe(
          (result: any) => {
            this.allClassSubjectSectionList = of(result.classSubjectDdl)
            this.allSubjectList = of(result.subjectDdl)
            this.allEmployeeList.teacher = of(result.teacherDdl)
            this.allEmployeeList.driver = of(result.driverDdl)
            this.allEmployeeList.conductor = of(result.conductorDdl)
            this.allUserRoleList = of(result.roleDdl)
            this.allSchoolBranchList = of(result.schoolBranchDdl)
            this.allExamTypeList = of(result.examTypeDdl)
            this.mapUserSettings(result.userSettings)
            notifier.next(true)            
          },
          (error) => {
            notifier.next(false)
            console.log(error)
          }
        );

        return notifier
  }

  mapUserSettings(userSettings){
    if(userSettings){
      MasterData.showErrorMessages = userSettings.showErrorMessages;
      MasterData.outlineFields = userSettings.outlineFields;
      MasterData.expendMultiple = userSettings.expendMultiple;
      MasterData.multipleMenuOpen = userSettings.multipleMenuOpen;
      MasterData.formAnimation = userSettings.formAnimation;
      MasterData.lineChartBgColor = userSettings.lineChartBgColor;
      MasterData.lineChartPointRadius = userSettings.lineChartPointRadius;
      MasterData.websiteMainColor = userSettings.websiteMainColor;
      MasterData.websiteBgImage = userSettings.websiteBgImage
      MasterData.websiteZoom = 100
      document.documentElement.style.setProperty('--main-color', MasterData.websiteMainColor);
      document.documentElement.style.setProperty('--main-bg-image', MasterData.websiteBgImage)
    }
  }

  /***************************************************************************************************************************************
    Methods Below will save their result as soon as their first call get completed.
    And any other subsequent call to that method will use that saved result
    
    ******** Working **********
    Step 1:- On very first call we create a new "Subject()". Which will work as saved data for any subsequent calls.

    caling Api :- Now, suppose when we are fetching data from api, then 5 time this method get called, till now we have "Subject()" observable object itself as data.
                  So we give it to those (5 methods) methods who called it. And they start waiting until we notify them.
            
    Step 2:- Now When api call get completed. Then first we notify those methods who are waiting.

    Step 3:- Now create a new Observable with data and it will serve any further calls to this method.     
    
    
    Question:- Why we Created new Observable at Step 3?
    Answer:-   At Step 0, we check if whether we have saved data or not. If we have then return save data otherwise call the api.
               Our saved data is not simple data it is an Observable.

               -> Our subject() observable serve data to those calls which are coming when we fetching the data from server
                  and we notify those method as soon as we get the data (Step 2)
               -> lets assume we deleted Step 3
               -> Suppose when we get the data from api successfully at 10:00am and at 10:05am we get another call to this method. 
                  Then we will give him saved "Subject()" observable which we have created at very first call. And that method will
                  start waiting untill we notify him.
                  Now how you notify that subject() observable this time?


  ****************************************************************************************************************************************/



  //************ Get class section subject ddl *********************************/
  
  getClassSubjectSectionDdl() {
    if (this.allClassSubjectSectionList) {
      return this.allClassSubjectSectionList
    }
    else {
      this.allClassSubjectSectionList = new Subject();
      this.http.get(environment.apiUrl + "api/class/getClassSubjectDdl")
        .pipe(take(1))
        .subscribe(
          (result: any) => {
            this.allClassSubjectSectionList.next(result)
            this.allClassSubjectSectionList = of(result)
          },
          (error) => {
            console.log(error)
          }
        );
    }
    return this.allClassSubjectSectionList
  }

  /************** Get Subject Ddl ********************************/
  getSubjectDdl() {
    if (this.allSubjectList) {
      return this.allSubjectList
    }
    else {
      this.allSubjectList = new Subject();
      this.http.get(environment.apiUrl + "api/subject/getSubjectDdl")
        .pipe(take(1))
        .subscribe(
          (result: any) => {
            this.allSubjectList.next(result)
            this.allSubjectList = of(result)
          },
          (error) => {
            console.log(error)
          }
        );
    }
    return this.allSubjectList
  }

   /************** Get Exam Type Ddl ********************************/
   getExamTypeDdl() {
    if (this.allExamTypeList) {
      return this.allExamTypeList
    }
    else {
      this.allExamTypeList = new Subject();
      this.http.get(environment.apiUrl + "api/examType/getExamTypeDdl")
        .pipe(take(1))
        .subscribe(
          (result: any) => {
            this.allExamTypeList.next(result)
            this.allExamTypeList = of(result)
          },
          (error) => {
            console.log(error)
          }
        );
    }
    return this.allExamTypeList
  }

  /************** Get School Branch Ddl ********************************/
  getSchoolBranchDdl() {
    if (this.allSchoolBranchList) {
      return this.allSchoolBranchList
    }
    else {
      this.allSchoolBranchList = new Subject();
      this.http.get(environment.apiUrl + "api/school/ddlSchoolBranch")
        .pipe(take(1))
        .subscribe(
          (result: any) => {
            this.allSchoolBranchList.next(result)
            this.allSchoolBranchList = of(result)
          },
          (error) => {
            console.log(error)
          }
        );
    }
    return this.allSchoolBranchList
  }

  /************** Get User Role Ddl ********************************/
  getUserRoleDdl() {
    if (this.allUserRoleList) {
      return this.allUserRoleList
    }
    else {
      this.allUserRoleList = new Subject();
      this.http.get(environment.apiUrl + "api/role/getRoleDdl")
        .pipe(take(1))
        .subscribe(
          (result: any) => {
            this.allUserRoleList.next(result)
            this.allUserRoleList = of(result)
          },
          (error) => {
            console.log(error)
          }
        );
    }
    return this.allUserRoleList
  }

  /************** Get Specific type Employee Ddl ********************************/
  teacherDdl() {
    if (this.allEmployeeList.teacher) {
      return this.allEmployeeList.teacher
    }
    else {
      this.allEmployeeList.teacher = new Subject();
      this.employeeDdl(MasterData.teacherRoleId)
        .pipe(take(1))
        .subscribe(
          (result: any) => {
            this.allEmployeeList.teacher.next(result)
            this.allEmployeeList.teacher = of(result)
          },
          (error) => {
            console.log(error)
          }
        );
    }
    return this.allEmployeeList.teacher
  }

  driverDdl() {
    if (this.allEmployeeList.driver) {
      return this.allEmployeeList.driver
    }
    else {
      this.allEmployeeList.driver = new Subject();
      this.employeeDdl(MasterData.driverRoleId)
        .pipe(take(1))
        .subscribe(
          (result: any) => {
            this.allEmployeeList.driver.next(result)
            this.allEmployeeList.driver = of(result)
          },
          (error) => {
            console.log(error)
          }
        );
    }
    return this.allEmployeeList.driver
  }

  conductorDdl() {
    if (this.allEmployeeList.conductor) {
      return this.allEmployeeList.conductor
    }
    else {
      this.allEmployeeList.conductor = new Subject();
      this.employeeDdl(MasterData.conductorRoleId)
        .pipe(take(1))
        .subscribe(
          (result: any) => {
            this.allEmployeeList.conductor.next(result)
            this.allEmployeeList.conductor = of(result)
          },
          (error) => {
            console.log(error)
          }
        );
    }
    return this.allEmployeeList.conductor
  }

  private employeeDdl(empRoleId) {
    return this.http.post(environment.apiUrl + "api/employee/" + "employeeDdl", empRoleId)
  }

  /*********  Class Section Wise Students  ***********/

  public ClassSectionWiseStudents() {
    return this.http.get(environment.apiUrl + "api/class/" + "ClassSectionWiseStudents")
  }

}
