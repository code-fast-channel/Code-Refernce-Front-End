import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { VehicleManagementComponent } from './vehicle/vehicle-management/vehicle-management.component';
import { NewVehicleComponent } from './vehicle/new-vehicle/new-vehicle.component';
import { SharedModule } from '@app/shared/shared.module';
import { TransportService } from './services/transport.service';
import { VehicleService } from './services/vehicle.service';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleBasicInfoComponent } from './vehicle/new-vehicle/vehicle-basic-info/vehicle-basic-info.component';
import { VehicleMaintenanceInfoComponent } from './vehicle/new-vehicle/vehicle-maintenance-info/vehicle-maintenance-info.component';
import { NewRouteComponent } from './routes/new-route/new-route.component';
import { RouteListComponent } from './routes/route-list/route-list.component';
import { RouteManagementComponent } from './routes/route-management/route-management.component';
import { RouteBasicInfoComponent } from './routes/new-route/route-basic-info/route-basic-info.component';
import { RouteStoppageInfoComponent } from './routes/new-route/route-stoppage-info/route-stoppage-info.component';
import { RouteService } from './services/route.service';
import { VehicleRouteInfoComponent } from './vehicle/new-vehicle/vehicle-route-info/vehicle-route-info.component';

@NgModule({
  declarations: [VehicleManagementComponent, NewVehicleComponent, VehicleListComponent, VehicleBasicInfoComponent, 
     VehicleMaintenanceInfoComponent, NewRouteComponent, RouteListComponent, RouteManagementComponent, 
     RouteBasicInfoComponent, RouteStoppageInfoComponent, VehicleRouteInfoComponent],
  imports: [
    CommonModule,
    TransportRoutingModule,
    SharedModule
  ],
  providers:[
    TransportService,
    VehicleService,
    RouteService
  ]
})
export class TransportModule { }
