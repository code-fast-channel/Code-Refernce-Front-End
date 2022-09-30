import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-role-entitlements',
  templateUrl: './role-entitlements.component.html',
  styleUrls: ['./role-entitlements.component.css']
})
export class RoleEntitlementsComponent implements OnInit {

  @Input() form: FormGroup  
  @Input() defaultEntitlement = null
  @Input() initialFormValues = null
  @Input() isViewMode = false
  
  
  public fieldsConfig: FieldConfig[] = []
  public initialEntitlements = null
  public isLoading = false

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.configureMenuItems()
    this.isLoading = false
  }

  configureMenuItems(){

    let pageId = this.defaultEntitlement.pageId
    
    let accessTypeId = this.defaultEntitlement.accessTypeId

    this.initialEntitlements = this.initialFormValues ? this.initialFormValues.entitlements : null

    if(this.initialEntitlements){
      let initialEntitlement = this.initialEntitlements.find(x => x.pageId === pageId)
      accessTypeId = initialEntitlement ? initialEntitlement.accessTypeId : accessTypeId
    }

    this.form.addControl("pageId", this.fb.control(pageId, Validators.required))
    this.form.addControl("subPage", this.fb.array([]))
    this.fieldsConfig.push(
      {
        isViewMode: this.isViewMode,
        type: "radiobutton",
        label: "",
        name: "accessTypeId",
        value: accessTypeId,
        options: MasterData.pageEntitlements,
        validations: [validationType.required()]
      }
    )

    this.configureSubMenuItems(<FormArray> this.form.get('subPage'))

  }

  configureSubMenuItems(formArray: FormArray){

    let defaultSubPages = this.defaultEntitlement.subPage

    defaultSubPages.forEach(subPage => {

      formArray.push(
        this.fb.group({})
      )
    });    
  }

}
