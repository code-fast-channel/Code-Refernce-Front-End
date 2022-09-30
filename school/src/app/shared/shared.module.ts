import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { MaterialModule } from './material-module';

import {DragDropModule} from '@angular/cdk/drag-drop';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { ToolTipDirective } from './directives/tool-tip.directive';

import { LoaderComponent } from './component/loader/loader.component';
import { SpinnerComponent } from './component/loader/spinner/spinner.component';
import { LoaderBarsComponent } from './component/loader/loader-bars/loader-bars.component';
import { ButtonFullscreenComponent } from './component/buttons/button-fullscreen/button-fullscreen.component';
import { CardComponent } from './component/boxes/card/card.component';
import { InfoBoxComponent } from './component/boxes/info-box/info-box.component';
import { SchoolDdlComponent } from './module/school/school-ddl/school-ddl.component';
import { FormAddressInfoComponent } from './component/form-templates/form-address-info/form-address-info.component';
import { FormContactInfoComponent } from './component/form-templates/form-contact-info/form-contact-info.component';
import { FormUserBasicInfoComponent } from './component/form-templates/form-user-basic-info/form-user-basic-info.component';
import { FormUserMedicalInfoComponent } from './component/form-templates/form-user-medical-info/form-user-medical-info.component';
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { CheckboxComponent } from './component/dynamic-form/checkbox/checkbox.component';
import { DateComponent } from './component/dynamic-form/date/date.component';
import { InputComponent } from './component/dynamic-form/input/input.component';
import { SelectComponent } from './component/dynamic-form/select/select.component';
import { RadiobuttonComponent } from './component/dynamic-form/radiobutton/radiobutton.component';
import { TextareaComponent } from './component/dynamic-form/textarea/textarea.component';
import { DynamicControlComponent } from './component/dynamic-control/dynamic-control.component';
import { FormUserCredentialsComponent } from './component/form-templates/form-user-credentials/form-user-credentials.component';
import { FormButtonsComponent } from './component/buttons/form-buttons/form-buttons.component';
import { FormOccupationInfoComponent } from './component/form-templates/form-occupation-info/form-occupation-info.component';
import { FormUserGovernmentIdsComponent } from './component/form-templates/form-user-government-ids/form-user-government-ids.component';
import { PanelValidatorDirective } from './directives/panel-validator.directive';
import { SmartDivComponent } from './component/boxes/smart-div/smart-div.component';
import { DdlRelationComponent } from './component/dropdowns/ddl-relation/ddl-relation.component';
import { ConfirmationDialogComponent } from './component/confirmation-dialog/confirmation-dialog.component';
import { MasterDataPipe } from './pipe/master-data.pipe';
import { SmallScreenComponent } from './component/boxes/small-screen/small-screen.component';
import { LargeScreenComponent } from './component/boxes/large-screen/large-screen.component';
import { ResponsiveComponent } from './component/boxes/responsive/responsive.component';
import { FormProfilePicComponent } from './component/form-templates/form-profile-pic/form-profile-pic.component';
import { ErrorMessageComponent } from './component/dynamic-form/error-message/error-message.component';
import { ToggleButtonComponent } from './component/dynamic-form/toggle-button/toggle-button.component';
import { RouteDdlComponent } from './module/transport/route-ddl/route-ddl.component';
import { SectionComponent } from './component/boxes/section/section.component';
import { DdlRoleComponent } from './component/dropdowns/ddl-role/ddl-role.component';
import { FormCodeNameComponent } from './component/form-templates/form-code-name/form-code-name.component';
import { ClassSectionDdlComponent } from './module/school/class-section-ddl/class-section-ddl.component';
import { DashboardBoxComponent } from './component/boxes/dashboard-box/dashboard-box.component';
import { ImageCropperComponent } from './component/image-cropper/image-cropper.component';
import { FlipCardComponent } from './component/boxes/flip-card/flip-card.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './component/chart/chart.component';
import { FormDateRangeComponent } from './component/form-templates/form-date-range/form-date-range.component';
import { OverallAttendanceCountChartComponent } from './module/attendance/overall-attendance-count-chart/overall-attendance-count-chart.component';
import { NumberDataPipe } from './pipe/number-data.pipe';
import { StarRatingComponent } from './component/star-rating/star-rating.component';
import { OverallRatingCountChartComponent } from './module/rating/overall-rating-count-chart/overall-rating-count-chart.component';
import { ObjectFilterPipe } from './pipe/object-filter.pipe';
import { CalendarComponent } from './component/calendar/calendar.component';
import { NoRecordFoundComponent } from './component/boxes/no-record-found/no-record-found.component';
import { TimeComponent } from './component/dynamic-form/time/time.component';
import { ROWComponent } from './component/boxes/row/row.component';
import { ColumnComponent } from './component/boxes/column/column.component';
import { FieldsetComponent } from './component/boxes/fieldset/fieldset.component';
import { ImageLazyLoadDirective } from './directives/image-lazy-load.directive';
import { NgxImageCompressService } from 'ngx-image-compress';
import { LocateMeComponent } from './component/form-templates/locate-me/locate-me.component';
import { UserCardComponent } from './component/form-templates/user-card/user-card.component';
import { FormTimeRangeComponent } from './component/form-templates/form-time-range/form-time-range.component';
import { TimePipe } from './pipe/time.pipe';
import { ClassPipe } from './pipe/class.pipe';
import { SubjectPipe } from './pipe/subject.pipe';
import { DrawTextOnImageDirective } from './directives/draw-text-on-image.directive';
import { RotateImageDirective } from './directives/rotate-image.directive';
import { HolidayAccordianComponent } from './module/school/holiday-accordian/holiday-accordian.component';
import { ExamAccordianComponent } from './module/exam/exam-accordian/exam-accordian.component';
import { IsTodayPipe } from './pipe/is-today.pipe';
import { SubjectTeacherDdlComponent } from './module/school/subject-teacher-ddl/subject-teacher-ddl.component';
import { UserRolePipe } from './pipe/user-role.pipe';
import { PageNamePipe } from './pipe/page-name.pipe';
import { TrimDirective } from './directives/trim.directive';
import { MapComponent } from './google-map/map/map.component';
import { AllQuotesComponent } from './component/quotes/all-quotes/all-quotes.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CreateQrCodeComponent } from './component/qr-code/create-qr-code/create-qr-code.component';
import { ReadQrCodeComponent } from './component/qr-code/read-qr-code/read-qr-code.component';
import { UserSmallPicComponent } from './component/user-small-pic/user-small-pic.component';
import { ExamTypePipe } from './pipe/exam-type.pipe';
import { RadioGroupCompareWithDirective } from './directives/radio-group-compare-with.directive';
import { ServerErrorHandlerService } from './services/server-error-handler.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RichTextBoxComponent } from './component/dynamic-form/rich-text-box/rich-text-box.component';
import { StudentWholeRatingComponent } from './module/rating/student-whole-rating/student-whole-rating.component';
import { StudentWholeRatingSearchComponent } from './module/rating/student-whole-rating/student-whole-rating-search/student-whole-rating-search.component';
import { RatingDateRangePipe } from './pipe/rating-date-range.pipe';
import { LinkButtonComponent } from './component/buttons/link-button/link-button.component';
import { CardBottomComponent } from './component/boxes/card-bottom/card-bottom.component';
import { BgImageComponent } from './component/bg-image/bg-image.component';
import { DdlStatusComponent } from './component/dropdowns/ddl-status/ddl-status.component';
import { ScrollToTopComponent } from './component/scroll-to-top/scroll-to-top.component';
import { ShowOnScrollComponent } from './component/show-on-scroll/show-on-scroll.component';
import { SchoolPipe } from './pipe/school.pipe';
import { FancyBoxComponent } from './component/boxes/fancy-box/fancy-box.component';
import { CarouselComponent } from './component/boxes/carousel/carousel.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    ChartsModule,
    QRCodeModule,
    AngularEditorModule,
    MatCarouselModule.forRoot(),
  ],
  exports:[
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonFullscreenComponent,
    CardComponent,
    CardBottomComponent,
    SectionComponent,
    FieldsetComponent,
    InfoBoxComponent,
    LoaderComponent,
    DragDropModule,
    TrimDirective,
    ToolTipDirective,
    SchoolDdlComponent,
    ClassSectionDdlComponent,
    SubjectTeacherDdlComponent,
    RouteDdlComponent,
    FormAddressInfoComponent,
    FormContactInfoComponent,
    FormUserCredentialsComponent,
    FormUserBasicInfoComponent,
    FormUserMedicalInfoComponent,
    FormOccupationInfoComponent,
    FormUserGovernmentIdsComponent,
    DynamicFormComponent,
    DynamicControlComponent,
    FormButtonsComponent,
    PanelValidatorDirective,
    SmartDivComponent,
    DdlStatusComponent,
    DdlRelationComponent,
    DdlRoleComponent,
    MasterDataPipe,
    NumberDataPipe,
    ObjectFilterPipe,
    TimePipe,
    IsTodayPipe,
    ClassPipe,
    SchoolPipe,
    SubjectPipe,
    UserRolePipe,
    PageNamePipe,
    ExamTypePipe,
    RatingDateRangePipe,
    SmallScreenComponent,
    LargeScreenComponent,
    ResponsiveComponent,
    ROWComponent,
    ColumnComponent,
    FormProfilePicComponent,
    FormCodeNameComponent,
    DashboardBoxComponent,
    ImageCropperComponent,
    FlipCardComponent,
    ChartComponent,
    FormDateRangeComponent,
    FormTimeRangeComponent,
    OverallAttendanceCountChartComponent,
    ShowOnScrollComponent,
    ScrollToTopComponent,
    StarRatingComponent,
    OverallRatingCountChartComponent,
    CalendarComponent, 
    NoRecordFoundComponent,
    LocateMeComponent,
    UserCardComponent,
    ImageLazyLoadDirective,
    RotateImageDirective,
    DrawTextOnImageDirective,
    HolidayAccordianComponent,
    ExamAccordianComponent,
    MapComponent,
    AllQuotesComponent,
    CreateQrCodeComponent,
    ReadQrCodeComponent,
    QRCodeModule,
    UserSmallPicComponent,
    RadioGroupCompareWithDirective,
    StudentWholeRatingComponent,
    LinkButtonComponent,
    BgImageComponent,
    FancyBoxComponent,
    CarouselComponent
  ],
  declarations: [CardComponent, InfoBoxComponent, LoaderComponent, SpinnerComponent, LoaderBarsComponent,
     ToolTipDirective, SchoolDdlComponent, ButtonFullscreenComponent, FormAddressInfoComponent, 
     FormContactInfoComponent, FormUserBasicInfoComponent, FormUserMedicalInfoComponent,
      CheckboxComponent, DateComponent, DynamicFormComponent, DynamicFieldDirective, 
      InputComponent, SelectComponent, RadiobuttonComponent, TextareaComponent, RichTextBoxComponent, DynamicControlComponent, 
      FormUserCredentialsComponent, FormButtonsComponent, FormOccupationInfoComponent, 
      FormUserGovernmentIdsComponent, PanelValidatorDirective, SmartDivComponent, DdlRelationComponent, 
      ConfirmationDialogComponent, MasterDataPipe, SmallScreenComponent, LargeScreenComponent, ResponsiveComponent, 
      FormProfilePicComponent, ErrorMessageComponent, ToggleButtonComponent, RouteDdlComponent, SectionComponent, DdlRoleComponent, FormCodeNameComponent, ClassSectionDdlComponent, 
      DashboardBoxComponent, ImageCropperComponent, FlipCardComponent, ChartComponent, FormDateRangeComponent, OverallAttendanceCountChartComponent, NumberDataPipe, StarRatingComponent,
      ScrollToTopComponent,
      OverallRatingCountChartComponent,
       ObjectFilterPipe,
       CalendarComponent,
       NoRecordFoundComponent,
       TimeComponent,
       ROWComponent,
       ColumnComponent,
       FieldsetComponent,
       ImageLazyLoadDirective,
       LocateMeComponent,
       UserCardComponent,
       FormTimeRangeComponent,
       TimePipe,
       ClassPipe,
       SubjectPipe,
       DrawTextOnImageDirective,
       RotateImageDirective,
       HolidayAccordianComponent,
       ExamAccordianComponent,
       IsTodayPipe,
       SubjectTeacherDdlComponent,
       UserRolePipe,
       PageNamePipe,
       TrimDirective,
       MapComponent,
       AllQuotesComponent,
       CreateQrCodeComponent,
       ReadQrCodeComponent,
       UserSmallPicComponent,
       ExamTypePipe,
       RadioGroupCompareWithDirective,
       StudentWholeRatingComponent,
       StudentWholeRatingSearchComponent,
       RatingDateRangePipe,
       LinkButtonComponent,
       CardBottomComponent,
       BgImageComponent,
       DdlStatusComponent,
       ShowOnScrollComponent,
       SchoolPipe,
       FancyBoxComponent,
       CarouselComponent
    ],
  providers: [
    UserRolePipe,
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {
      provide: HTTP_INTERCEPTORS,
       useClass: ServerErrorHandlerService,
       multi: true
    }
  ],
  entryComponents: [
    InputComponent,
    TextareaComponent,
    ToggleButtonComponent,
    SelectComponent,
    DateComponent,
    TimeComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    ConfirmationDialogComponent,
    RichTextBoxComponent
  ]
})
export class SharedModule { }