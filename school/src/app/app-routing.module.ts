import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteMapComponent } from './site-map/site-map.component';
import { AuthorizationService } from './shared/services/authorization.service';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SwitchRoleComponent } from './switch-role/switch-role.component';
import { CustomPreloadingStrategyService } from './shared/services/custom-preloading-strategy.service';

const routes: Routes = [      
  {
    path: 'app',
    loadChildren: () => import('./pre-login/pre-login.module').then(m => m.PreLoginModule) //'./pre-login/pre-login.module#PreLoginModule'
  },
  {
    path: 'pl',
    loadChildren: () => import('./post-login/post-login.module').then(m => m.PostLoginModule), //'./post-login/post-login.module#PostLoginModule',
    canActivate:[AuthorizationService]
  },
  {
    path: 'public',
    loadChildren: () => import('./pre-login/pre-login.module').then(m => m.PreLoginModule) //'./pre-login/pre-login.module#PreLoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./post-login/dashboard/dashboard.module').then(m => m.DashboardModule), //'./post-login/dashboard/dashboard.module#DashboardModule',
    canActivate:[AuthorizationService]
  },
  { path:'switchRole', component: SwitchRoleComponent},
  { path:'signout', component: SignOutComponent},
  { path:'', component: SignOutComponent},
  { path:'**', component: SiteMapComponent}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadingStrategyService,
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
    useHash: true
  }
  )],
  exports: [RouterModule]
 
})
export class AppRoutingModule {
 }