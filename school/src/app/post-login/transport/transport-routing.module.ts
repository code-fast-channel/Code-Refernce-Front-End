import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleManagementComponent } from './vehicle/vehicle-management/vehicle-management.component';
import { RouteManagementComponent } from './routes/route-management/route-management.component';

const routes: Routes = [
  {
    path: 'vehiclemgmt',
    component: VehicleManagementComponent,
    outlet:'postLoginOutlet'
  },
  {
    path: 'routemgmt',
    component: RouteManagementComponent,
    outlet:'postLoginOutlet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
