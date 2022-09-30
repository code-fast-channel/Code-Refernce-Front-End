import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ExamManagementComponent } from './exam-management/exam-management.component';
import { ExamListComponent } from './exam-management/exam-list/exam-list.component';
import { NewExamComponent } from './exam-management/new-exam/new-exam.component';
import { ExamBasicInfoComponent } from './exam-management/new-exam/exam-basic-info/exam-basic-info.component';
import { ExamService } from './services/exam.service';
import { SharedModule } from '@app/shared/shared.module';
import { ClassSubjectComponent } from './exam-management/new-exam/class-subject/class-subject.component';
import { SubjectExamResultComponent } from './exam-management/new-exam/class-subject/subject-exam-result/subject-exam-result.component';
import { ExamTypeManagementComponent } from './exam-type-management/exam-type-management.component';
import { NewExamTypeComponent } from './exam-type-management/new-exam-type/new-exam-type.component';
import { ExamTypeListComponent } from './exam-type-management/exam-type-list/exam-type-list.component';
import { ExamTypeBasicInfoComponent } from './exam-type-management/new-exam-type/exam-type-basic-info/exam-type-basic-info.component';
import { ExamTypeService } from './services/exam-type.service';
import { ExamReportCardComponent } from './exam-management/exam-report-card/exam-report-card.component';
import { SubjectExamResultGraphComponent } from './exam-management/new-exam/class-subject/subject-exam-result/subject-exam-result-graph/subject-exam-result-graph.component';
import { TabularFormatComponent } from './exam-management/exam-report-card/tabular-format/tabular-format.component';
import { PanelFormatComponent } from './exam-management/exam-report-card/panel-format/panel-format.component';

@NgModule({
  declarations: [ExamManagementComponent,
    ExamListComponent, NewExamComponent, ExamBasicInfoComponent, ClassSubjectComponent, SubjectExamResultComponent, ExamTypeManagementComponent, NewExamTypeComponent, 
    ExamTypeListComponent, ExamTypeBasicInfoComponent, ExamReportCardComponent, SubjectExamResultGraphComponent, TabularFormatComponent, PanelFormatComponent],
  imports: [
    ExamRoutingModule,
    SharedModule
  ],
  providers:[ExamService, ExamTypeService]
})
export class ExamModule { }
