import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors, AbstractControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FieldConfig } from '../field.interface';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-rich-text-box',
  templateUrl: './rich-text-box.component.html',
  styleUrls: ['./rich-text-box.component.css']
})
export class RichTextBoxComponent implements OnInit {
  
  field: FieldConfig;
  group: FormGroup;
  public validators: ValidationErrors
  public editorConfig: AngularEditorConfig
  masterData = MasterData;
  
  constructor() {
  }

  ngOnInit() {
    let control = this.group.get(this.field.name)
    
    if(this.field.isViewMode){
      control.disable()
    }
    
    if (control.validator) {
      this.validators = control.validator({} as AbstractControl);
    }
    
    this.setEditorConfig()
  }

  setEditorConfig() {

    this.editorConfig = {
      outline: true,
      editable: !this.field.isViewMode,
      spellcheck: true,
      height: 'auto',
      minHeight: '100',
      maxHeight: 'auto',
      width: '98%',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: !this.field.isViewMode,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' }
      ],
      customClasses: [
        {
          name: 'redBackground',
          class: 'redBackground'
        },
        {
          name: 'yellowBackground',
          class: 'yellowBackground'
        },        
        {
          name: 'orangeBackground',
          class: 'orangeBackground'
        },        
        {
          name: 'blackBackground',
          class: 'blackBackground'
        },
        {
          name: 'greenBackground',
          class: 'greenBackground'
        }
      ],
      uploadUrl: 'v1/image',
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['backgroundColor', 'customClasses', 'insertVideo', 'insertImage', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull']
      ]
    }
  }

}
