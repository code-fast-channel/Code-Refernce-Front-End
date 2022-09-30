import { Pipe, PipeTransform } from '@angular/core';
import { defaultMenuListAndEntitlements, MasterData } from '@env/environment';

@Pipe({
  name: 'pageName'
})
export class PageNamePipe implements PipeTransform {

  transform(pageId, subPageId = null): any {

    let page = defaultMenuListAndEntitlements.find(x => x.pageId === pageId)

    if(!page){
      return MasterData.emptyDataText
    }

    let subPage = null
    
    if(subPageId){
      subPage = page.subPage.find(x => x.subPageId === subPageId)
    }    
    return subPage ? subPage.menu.name : page.menu.name;
  }

}
