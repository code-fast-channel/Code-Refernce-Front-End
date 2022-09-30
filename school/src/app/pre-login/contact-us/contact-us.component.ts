import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { FormGroup } from '@angular/forms';
import { SharedService } from '@app/shared/services/shared.service';
import { PreLoginService } from '../services/pre-login.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  
  @Input() fieldsConfig: FieldConfig[]
  
  public slides
  public mainForm: FormGroup = new FormGroup({})
  public isLoading
  public isCaptchaVerified

  constructor(
    private sharedService: SharedService,
    private preLoginService: PreLoginService
  ) { }

  ngOnInit(): void {
    this.ConfigureSlides()
    this.configureFields()
  }

  ConfigureSlides(){
    this.slides = [
      {
        image: "assets/images/contactUs.jpg"
      },
      {
        image: "assets/images/contactUs2.jpg"
      }
    ]
  }

  configureFields(){
    this.fieldsConfig = [      
      {
        isViewMode: true,
        type: "date",
        label: "Inquiry date",
        name: "inquiryDate",
        options: {selectToday : true},
        validations: [validationType.required()]
      }, 
      {
        isViewMode : false,
        type: "input",
        label: "Name",
        inputType: "text",
        name: "name",
        icon: "person",
        validations: [validationType.required()]
      },     
      {
        isViewMode: false,
        type: "input",
        label: "Email Address",
        inputType: "email",
        name: "email",
        validations: [validationType.required(), validationType.email()]
      },
      {
        isViewMode: false,
        type: "input",
        label: "Contact No",
        inputType: "text",
        name: "contactNo",
        icon: "phone_iphone",
        validations: [validationType.required()]
      },
      {
        isViewMode : false,
        type: "input",
        label: "Subject",
        inputType: "text",
        name: "subject",
        icon: "subject",
        validations: [validationType.required()]
      }, 
      {
        isViewMode: false,
        type: "textarea",
        label: "Description",
        inputType: "textarea",
        name: "description",
        validations: [validationType.required()]
      }
    ]
  }

  confirmSubmit(formData: Event) {
    let dialogRef = this.sharedService.openConfirmDialog("You want to send the inquiry?")

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (confirmed: boolean) => {
          if (confirmed) {
            this.onSubmit(formData)
          }
        },
        (error) => {
          this.isLoading = false
        }
      );
  }

  onSubmit(formData: Event) {
    this.mainForm.markAllAsTouched()
    formData.preventDefault();
    formData.stopPropagation();

    if (this.mainForm.valid) {
      //this.isLoading = true

    } else {
      this.sharedService.openSnackBar("Some fields are invalid. Please fill them properly.", "x", "fail")
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
