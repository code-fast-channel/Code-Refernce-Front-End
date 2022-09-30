import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';

@Component({
  selector: 'sub-page-entitlement',
  templateUrl: './sub-page-entitlement.component.html',
  styleUrls: ['./sub-page-entitlement.component.css']
})
export class SubPageEntitlementComponent implements OnInit {

  @Input() form: FormGroup  
  @Input() pageId = null
  @Input() defaultEntitlement = null
  @Input() initialFormValues = null
  @Input() isViewMode = false

  public fieldsConfig: FieldConfig[] = []
  public subPageId
  public isLoading = false
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.configureFields()
    this.isLoading = false
  }

  configureFields(){
    this.subPageId = this.defaultEntitlement.subPageId
    let accessTypeId = this.defaultEntitlement.accessTypeId

    if(this.initialFormValues){

      let filteredInitialValues = this.initialFormValues.find(x => x.pageId === this.pageId)
      
      if(filteredInitialValues){
        let initialEntitlement = filteredInitialValues.subPage.find(x => x.subPageId === this.subPageId)
        accessTypeId = initialEntitlement ? initialEntitlement.accessTypeId : accessTypeId
      }
    }

    this.form.addControl("subPageId", this.fb.control(this.subPageId, Validators.required))
    this.fieldsConfig.push(
      {
        isViewMode: this.isViewMode,
        type: "radiobutton",
        label: "",
        name: "accessTypeId",
        value: accessTypeId,
        options: MasterData.subPageEntitlements,
        validations: [validationType.required()]
      }
    )
  }

}
