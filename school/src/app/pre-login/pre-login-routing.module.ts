import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { PreLoginComponent } from './pre-login/pre-login.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FacultyComponent } from './faculty/faculty.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [ 
  {
    path: 'guest',
    component: PreLoginComponent,
    children:[
      {
        path: 'home',
        component: HomeComponent,
        outlet:"preLoginOutlet"
      },
      {
        path: 'aboutUs',
        component: AboutUsComponent,
        outlet:"preLoginOutlet"
      },
      {
        path: 'contactUs',
        component: ContactUsComponent,
        outlet:"preLoginOutlet"
      },
      {
        path: 'faculty',
        component: FacultyComponent,
        outlet:"preLoginOutlet"
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        outlet:"preLoginOutlet"
      },
      {
        path: 'signin',
        component: SignInComponent,
        outlet:"preLoginOutlet"
      },
      {
        path: 'singup',
        component: SignUpComponent,
        outlet:"preLoginOutlet"
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreLoginRoutingModule { }