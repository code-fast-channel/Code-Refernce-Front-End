import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { TimeTableComponent } from './time-table/time-table.component';

const routes1: Routes = [
  {
    path: "default",
    component: DefaultDashboardComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: "noticeBoard",
    component: NoticeBoardComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: "timeTable",
    component: TimeTableComponent,
    outlet:'postLoginOutlet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes1)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
