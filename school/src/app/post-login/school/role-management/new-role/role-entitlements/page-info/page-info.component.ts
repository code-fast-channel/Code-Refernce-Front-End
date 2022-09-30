import { Component, OnInit, Input } from '@angular/core';
import { defaultMenuListAndEntitlements, MasterData } from '@env/environment';

@Component({
  selector: 'page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.css']
})
export class PageInfoComponent implements OnInit {

  @Input() pageId
  @Input() subPageId

  public pageData

  constructor() { }

  ngOnInit() {
    this.collectMenuPageData()
  }

  collectMenuPageData(){
    let page = defaultMenuListAndEntitlements.find(x => x.pageId === this.pageId)

    if(!page){
      return MasterData.emptyDataText
    }

    let subPage = null
    
    if(this.subPageId){
      subPage = page.subPage.find(x => x.subPageId === this.subPageId)
    }    

    if(subPage){
      this.pageData = {
        "name" : subPage.menu.name,
        "icon" : subPage.menu.icon
      }
    }
    else{
      this.pageData =  {
        "name" : page.menu.name,
        "icon" : page.menu.icon
      }
    }
  
  }

}
