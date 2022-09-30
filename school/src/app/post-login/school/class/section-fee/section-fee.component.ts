import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { MasterData } from '@env/environment';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'section-fee',
  templateUrl: './section-fee.component.html',
  styleUrls: ['./section-fee.component.css']
})
export class SectionFeeComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @Input() formArray: FormArray
  @Input() initialFormValues = null
  @Input() fieldsConfig: FieldConfig[]
  @Input() isViewMode = false
  @Input() sectionId

  masterData = MasterData
  public form = new FormGroup({})

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.formArray.push(this.form)
    this.makeFieldConfig()
  }

  makeFieldConfig() {

    this.form.addControl("sectionId", new FormControl(this.sectionId))

    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode,
        type: "input",
        label: "Any Section Extra Fee",
        inputType: "number",
        name: "fee",
        icon: "money",
        value: 0
      },
      {
        isViewMode: this.isViewMode,
        type: "textarea",
        label: "Section Description/Comments",
        inputType: "textarea",
        name: "description"
      }
    ];

    let editModeValues = this.initialFormValues ? this.initialFormValues.find(x => x.sectionId === this.sectionId) : null
    this.sharedService.setFormInitialValueForChangeMode(this.fieldsConfig, editModeValues)
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
