import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { SharedModule } from '@app/shared/shared.module';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { DashboardService } from './services/dashboard.service';
import { TimeTableComponent } from './time-table/time-table.component';

@NgModule({
  declarations: [DefaultDashboardComponent, NoticeBoardComponent, TimeTableComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
