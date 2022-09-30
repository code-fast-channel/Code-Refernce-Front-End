import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { SiteMapComponent } from './site-map/site-map.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SignOutComponent } from './sign-out/sign-out.component';
import { ChartsModule } from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SwitchRoleComponent } from './switch-role/switch-role.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { InstallAppComponent } from './install-app/install-app.component';
import { AppErrorHandlerService } from './shared/services/app-error-handler.service';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,  
    BrowserAnimationsModule, 
    ChartsModule,
    SharedModule,
    GoogleMapsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true, registrationStrategy: 'registerImmediately' }),
  ],
  declarations: [AppComponent, SiteMapComponent, SignOutComponent, SwitchRoleComponent, InstallAppComponent],
  bootstrap: [AppComponent],
  providers: [
    NgxImageCompressService,
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: ErrorHandler, useClass: AppErrorHandlerService}
  ]
})
export class AppModule { }
