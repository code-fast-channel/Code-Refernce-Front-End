import { NgModule } from '@angular/core';
import {PreLoginRoutingModule} from './pre-login-routing.module';
import {SharedModule} from '../shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PreLoginService } from './services/pre-login.service';
import { PreLoginComponent } from './pre-login/pre-login.component';
import { PreLoginMenuComponent } from './pre-login-menu/pre-login-menu.component';
import { SignInService } from './services/sign-in.service';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FacultyComponent } from './faculty/faculty.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PreLoginFooterComponent } from './pre-login-footer/pre-login-footer.component';
import { PreLoginHeaderComponent } from './pre-login-header/pre-login-header.component';
import { AdmissionProcessComponent } from './common-sections/admission-process/admission-process.component';
import { DirectorSpeakComponent } from './common-sections/director-speak/director-speak.component';
import { GeneralSchoolRulesComponent } from './common-sections/general-school-rules/general-school-rules.component';
import { GuardianReviewsComponent } from './common-sections/guardian-reviews/guardian-reviews.component';
import { OurMissionComponent } from './common-sections/our-mission/our-mission.component';
import { OurVisionComponent } from './common-sections/our-vision/our-vision.component';
import { PrincipalSpeakComponent } from './common-sections/principal-speak/principal-speak.component';
import { WhatWeOfferComponent } from './common-sections/what-we-offer/what-we-offer.component';

@NgModule({
  imports: [
    PreLoginRoutingModule,
    SharedModule
  ],
  declarations: [SignInComponent, SignUpComponent, PreLoginComponent, PreLoginMenuComponent, HomeComponent, AboutUsComponent, ContactUsComponent, FacultyComponent, GalleryComponent, PreLoginFooterComponent, PreLoginHeaderComponent, AdmissionProcessComponent, DirectorSpeakComponent, GeneralSchoolRulesComponent, GuardianReviewsComponent, OurMissionComponent, OurVisionComponent, PrincipalSpeakComponent, WhatWeOfferComponent],
  exports:[ ],
  providers:[
    PreLoginService,
    SignInService
  ]
})
export class PreLoginModule { }