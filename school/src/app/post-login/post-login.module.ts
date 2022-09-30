import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { PostLoginComponent } from './post-login/post-login.component';
import { PostLoginMenuComponent } from './post-login-menu/post-login-menu.component';
import { PostLoginHeaderComponent } from './post-login-header/post-login-header.component';
import { PostLoginFooterComponent } from './post-login-footer/post-login-footer.component';
import { MenuUserProfileComponent } from './post-login-menu/menu-user-profile/menu-user-profile.component';
import { PostLoginRoutingModule } from './post-login-routing.module';
import { SelectSchoolBranchComponent } from './components/select-school-branch/select-school-branch.component';
import { PostLoginService } from './post-login.service';
import { AgendaCalendarComponent } from './components/agenda-calendar/agenda-calendar.component';
import { HolidayCalendarComponent } from './components/holiday-calendar/holiday-calendar.component';
import { ExamCalendarComponent } from './components/exam-calendar/exam-calendar.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
@NgModule({
  imports: [
    PostLoginRoutingModule,
    SharedModule
  ],
  declarations: [PostLoginComponent,PostLoginMenuComponent, PostLoginHeaderComponent, PostLoginFooterComponent, 
    MenuUserProfileComponent, SelectSchoolBranchComponent, AgendaCalendarComponent, HolidayCalendarComponent, ExamCalendarComponent, UserSettingsComponent
    ],
  exports:[
   ],
  providers:[
    PostLoginService
  ]
})
export class PostLoginModule { }