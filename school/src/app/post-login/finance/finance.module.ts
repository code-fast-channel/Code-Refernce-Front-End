import { NgModule } from '@angular/core';

import { FinanceRoutingModule } from './finance-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { FinanceService } from './services/finance.service';
import { FeeManagementComponent } from './fee-management/fee-management.component';
import { FineManagementComponent } from './fine-management/fine-management.component';
import { ExpenceManagementComponent } from './expence-management/expence-management.component';
import { NewFeeComponent } from './fee-management/new-fee/new-fee.component';
import { FeeListComponent } from './fee-management/fee-list/fee-list.component';


@NgModule({
  declarations: [FeeManagementComponent, FineManagementComponent, ExpenceManagementComponent, NewFeeComponent, FeeListComponent],
  imports: [
    SharedModule,
    FinanceRoutingModule
  ],
  providers: [FinanceService]
})
export class FinanceModule { }
