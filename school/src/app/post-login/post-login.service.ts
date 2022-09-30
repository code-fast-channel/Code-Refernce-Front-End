import { Injectable } from '@angular/core';
import { MasterData, environment } from '@env/environment';
import { Router } from '@angular/router';
import { SharedService } from '@app/shared/services/shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostLoginService {

    public currentUserRoleEntitlements

    environment = environment
    
    constructor(
        private router: Router,
        private http: HttpClient,
        private sharedService: SharedService
    ) {}
    
    hasMultipleRoles(){
        let userRoles = JSON.parse(this.sharedService.loggedInData())
        return  userRoles && userRoles.roles && userRoles.roles.length > 1
    }

    //************* Navigate to my Profile */
    navigateToMyProfile() {
        
        let isStudent = MasterData.studentRoleId['$oid'] === this.sharedService.currentUserRoleId()['$oid']
        let isGuardian = MasterData.guardianRoleId['$oid'] === this.sharedService.currentUserRoleId()['$oid']

        if (isStudent || isGuardian) {
            this.router.navigateByUrl("pl/secure/studentguardian/(postLoginOutlet:myProfile)")
        }
        else {
            this.router.navigateByUrl("pl/secure/employee/(postLoginOutlet:myProfile)")
        }
    }

    getPageEntitlements(pageId, subPageId){
        let currentUserRoleId = this.sharedService.currentUserRoleId()

        if(currentUserRoleId['$oid'] === MasterData.superAdminRoleId['$oid']){
            return 2
        }
        else{
            let page = this.currentUserRoleEntitlements.find(x => x.pageId === pageId)
            let subPage = page.subPage.find(x => x.subPageId === subPageId)

            if(page.accessTypeId === 0 || subPage.accessTypeId === 0){
                //logOut
            }
            else{
                return subPage.accessTypeId
            }
        }
    }

    /*******************************************************************
     * Save User settings
     *******************************************************************/
    saveUserSettings(data){
       return this.http.post(this.environment.apiUrl + "api/userSettings/" + "saveUserSettings", data)
    }
    
    restoreDefaultSettings(id){
        return this.http.get(this.environment.apiUrl + "api/userSettings/restoreDefaultSettings?id=" + id)
     }
    
}
