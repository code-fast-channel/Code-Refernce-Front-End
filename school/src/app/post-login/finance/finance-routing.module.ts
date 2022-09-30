import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeeManagementComponent } from './fee-management/fee-management.component';
import { FineManagementComponent } from './fine-management/fine-management.component';
import { ExpenceManagementComponent } from './expence-management/expence-management.component';


const routes: Routes = [  
  {
    path: 'feeMgmt',
    component: FeeManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'fineMgmt',
    component: FineManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'expenceMgmt',
    component: ExpenceManagementComponent,
    outlet:'postLoginOutlet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
