import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MasterData, defaultMenuListAndEntitlements } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { take } from 'rxjs/operators';
import { PostLoginService } from '../post-login.service';

@Component({
  selector: 'app-post-login-menu',
  templateUrl: './post-login-menu.component.html',
  styleUrls: ['./post-login-menu.component.css']
})
export class PostLoginMenuComponent implements OnInit {

  @Output() toggleSideMenu: EventEmitter<boolean> = new EventEmitter()
  @Input() onlyIcons = false

  masterData = MasterData
  AllDefaultMenuData = defaultMenuListAndEntitlements

  public menuList = []
  public isSuperAdmin


  constructor(
    public router: Router,
    public sharedService: SharedService,
    private sharedApiService: SharedApiService,
    private plService: PostLoginService
  ) { }

  ngOnInit() {

    this.sharedApiService.getUserRoleDdl()
      .pipe(take(1))
      .subscribe(
        (result: any) => {
          let currentRoleEntitlements = result.filter(x => x["_id"]["$oid"] === this.sharedService.currentUserRoleId()['$oid'])

          this.setRoleWiseMenu(currentRoleEntitlements[0]["entitlements"])
        },
        (error) => {
          console.log(error)
        }
      );


    this.closeAllMenus()
  }

  setRoleWiseMenu(roleEntitlements) {

    this.plService.currentUserRoleEntitlements = roleEntitlements

    if (this.sharedService.currentUserRoleId()['$oid'] === this.masterData.superAdminRoleId['$oid']) {
      this.isSuperAdmin = true
      roleEntitlements = this.AllDefaultMenuData
    }
    else {
      roleEntitlements = roleEntitlements.filter(x => x.accessTypeId != 0)
    }

    roleEntitlements.forEach(validMenu => {
      let filteredMenu = this.filterMenusAndSubmenu(validMenu)
      this.menuList.push(filteredMenu)
    });
  }

  filterMenusAndSubmenu(validRoleMenu) {
    let menu = {}
    let defaultMenu = this.AllDefaultMenuData.find(x => x.pageId === validRoleMenu.pageId)
    menu['name'] = defaultMenu.menu.name
    menu['icon'] = defaultMenu.menu.icon
    menu['modelUrl'] = defaultMenu.menu.modelUrl
    menu['children'] = []

    if (this.sharedService.currentUserRoleId()['$oid'] === this.masterData.superAdminRoleId['$oid']) {
      menu['children'] = defaultMenu.subPage.map(x => x.menu)
    }
    else {
      validRoleMenu.subPage.filter(x => x.accessTypeId != 0)
        .forEach(element => {
          let validSubMenu = defaultMenu.subPage.find(x => x.subPageId === element.subPageId)
          if (validSubMenu) {
            menu['children'].push(validSubMenu.menu)
          }
        });
    }

    return menu
  }

  closeAllMenus(object = this.menuList) {

    if (!this.masterData.multipleMenuOpen) {
      object.forEach(element => {
        if (element["children"] && element["children"].length > 0) {
          this.closeAllMenus(element["children"])
          element["showSubfolders"] = false
        }
      });
    }
    return true
  }

  closeSideMenu() {
    this.toggleSideMenu.emit(false)
  }

  superAdminButtonClicked() {
    let url = "pl/secure/school/(postLoginOutlet:schoolmgmt)"
    this.router.navigateByUrl(url)
  }

}