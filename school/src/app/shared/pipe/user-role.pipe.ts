import { Pipe, PipeTransform } from '@angular/core';
import { SharedApiService } from '../services/shared-api.service';
import { take } from 'rxjs/operators';
import { MasterData } from '@env/environment';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  allUserRoleList = null

  constructor(
    private sharedApiService: SharedApiService,
  ) {
    this.sharedApiService.getUserRoleDdl()
      .pipe(take(1))
      .subscribe(val => {
        this.allUserRoleList = val
      },
        error => {
        }
      )
  }
  /******** This pipe Performs Two Actions:- *********
   *  Action 1:- Give the roleName based on passed "id".
   *  Action 2:- If agrument is passed as "isPredefined", then will return a bool whether role is predefined or not
   *             Predefined roles are declared in environment varables. For eg: SuperAdmin, Student, Guardian
   */
  transform(id: any, argument: string = null): any {
    
    if(!id){
      return argument ? false : MasterData.emptyDataText
    }

    id = id.$oid ? id.$oid : id

    //--- Perfrom Action 2 ---------
    if(argument && argument.toLowerCase() === 'ispredefined'){
      return    id === MasterData.superAdminRoleId["$oid"]
             || id === MasterData.studentRoleId["$oid"]
             || id === MasterData.guardianRoleId["$oid"] 
             || id === MasterData.teacherRoleId["$oid"] 
             || id === MasterData.driverRoleId["$oid"] 
             || id === MasterData.conductorRoleId["$oid"]  
             || id === MasterData.schoolAdminRoleId["$oid"]
             || id === MasterData.schoolBranchAdminRoleId["$oid"]
    }
    else if(argument && argument.toLowerCase() === 'ispredefinedbutnotadmin'){
      return    id === MasterData.studentRoleId["$oid"]
             || id === MasterData.guardianRoleId["$oid"] 
             || id === MasterData.teacherRoleId["$oid"] 
             || id === MasterData.driverRoleId["$oid"] 
             || id === MasterData.conductorRoleId["$oid"]  
    }
    else if(argument && argument.toLowerCase() === 'isanyadmin'){
      return    id === MasterData.superAdminRoleId["$oid"]
                || id === MasterData.schoolAdminRoleId["$oid"]
                || id === MasterData.schoolBranchAdminRoleId["$oid"] 
    }
    else if(argument && argument.toLowerCase() === 'issuperadmin'){
      return    id === MasterData.superAdminRoleId["$oid"]
    }
    else if(argument && argument.toLowerCase() === 'isnotanyadmin'){
      let anyAdmin =    id === MasterData.superAdminRoleId["$oid"]
                      || id === MasterData.schoolAdminRoleId["$oid"]
                      || id === MasterData.schoolBranchAdminRoleId["$oid"] 
      return !anyAdmin
    }
    else if(argument && argument.toLowerCase() === 'isNeedToDisable'){
      return    id === MasterData.superAdminRoleId["$oid"]
             || id === MasterData.studentRoleId["$oid"]
             || id === MasterData.guardianRoleId["$oid"] 
    }

    let role = this.allUserRoleList.find(x => x._id.$oid === id)
    return role ? role.name : MasterData.emptyDataText;
  }

}
