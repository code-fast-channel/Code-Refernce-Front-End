import { Component, OnInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FieldConfig, validationType } from '@app/shared/component/dynamic-form/field.interface';
import { MasterData } from '@env/environment';
import { SharedApiService } from '@app/shared/services/shared-api.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'class-subject',
  templateUrl: './class-subject.component.html',
  styleUrls: ['./class-subject.component.css']
})
export class ClassSubjectComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Input() form: FormGroup
  @Input() examId
  @Input() fieldsConfig: FieldConfig[]
  @Input() initialFormValues = null
  @Input() isViewMode = false
  @Input() isEditMode
  @Input() ClassSectionWiseStudents

  isLoading = false
  masterData = MasterData

  public allClassSubjectObject
  public classObject
  public sectionList = null
  public subjectList = null

  branchClassChanged$ = new EventEmitter<any>()
  sectionChanged$ = new EventEmitter<any>()

  constructor(
    private sharedApiService: SharedApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.initialFormValues) {
      this.isEditMode = true
    }

    this.form.addControl("classSection", this.fb.control({}));
    this.form.addControl("subject",
      this.fb.array([])
    );

    this.fieldsConfig = [
      {
        isViewMode: this.isViewMode || this.isEditMode,
        type: "select",
        label: "Class",
        name: "classId",
        icon: "ballot",
        onValueChange: this.branchClassChanged$,
        options: null,
        value: this.initialFormValues ? this.initialFormValues.classId : null,
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode || this.isEditMode,
        type: "select",
        label: "Academic Session",
        name: "academicSessionId",
        icon: "ballot",
        options: this.masterData.academicSessions,
        value: this.initialFormValues ? this.initialFormValues.academicSessionId : null,
        validations: [validationType.required()]
      },
      {
        isViewMode: this.isViewMode || this.isEditMode,
        type: "select",
        label: "Exam type",
        name: "examTypeId",
        icon: "developer_board",
        value: this.initialFormValues ? this.initialFormValues.examTypeId : null,
        validations: [validationType.required()]
      }
    ]

    this.registerDropdownChangeEvents()

    this.fetchExamTypeDdl()
    this.fetchClassDdl()
  }

  registerDropdownChangeEvents() {
    this.branchClassChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.branchClassChanged(val)
      })
  }

  fetchExamTypeDdl() {
    this.isLoading = true
    this.fieldsConfig[2].options = []; // make exam type list empty    

    this.sharedApiService.getExamTypeDdl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.fieldsConfig[2].options = val;
        this.isLoading = false
      },
        error => {
          this.isLoading = false
        }
      )
  }

  fetchClassDdl() {
    this.isLoading = true
    this.fieldsConfig[0].options = []; // make class list empty    

    this.sharedApiService.getClassSubjectSectionDdl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.allClassSubjectObject = val
        this.populateClassDdl(val)
        this.isLoading = false
      },
        error => {
          this.isLoading = false
        }
      )
  }

  populateClassDdl(values) {
    this.fieldsConfig[0].options = values;

    if (this.isViewMode || this.isEditMode) {
      this.loadClassWiseExam(this.initialFormValues.classId)
    }
  }

  branchClassChanged(classId) {
    this.loadClassWiseExam(classId)
  }

  loadClassWiseExam(classId) {
    this.isLoading = true
    this.sectionList = null;
    this.subjectList = null;

    (<FormArray>this.form.get('subject')).clear()
    this.form.get('classSection').setValue(null);

    if (this.initialFormValues) {
      // In case of update we only show those sections and subjects of the class, which was available add the time of creating this exam.
      this.sectionList = this.initialFormValues.classSection
      this.subjectList = this.initialFormValues.subject.sort((a, b) => a.examDate > b.examDate ? 1 : -1)

      this.subjectList && this.subjectList.forEach(subject => {
        this.addSubject(classId, subject.subjectId, subject.sections)
      });
    }
    else {
      // When creating new exam, we will show all the current sections and subjects of the selected class.
      this.classObject = this.allClassSubjectObject.filter(x => x._id.$oid === classId.$oid)
      if (this.classObject.length > 0) {
        this.classObject = this.classObject[0]
        this.sectionList = this.classObject.classSection
        this.subjectList = this.classObject.subject.filter(x => x.status == 1)
        this.filterUniqueSubjects()

        this.subjectList && this.subjectList.forEach(subject => {
          this.addSubject(classId, subject._id, subject.sections)
        });
      }
    }

    this.sectionList && this.form.get('classSection').setValue(this.sectionList);
    this.isLoading = false
  }

  filterUniqueSubjects() {
    let uniqueSubjects = []

    this.subjectList.forEach(sub => {
      let filtered = uniqueSubjects.filter(x => x["_id"]["$oid"] === sub["_id"]["$oid"])

      // If subject is not present their already
      if (filtered.length === 0) {
        let subObject = {
          _id: sub["_id"],
          sections: [sub.sectionId]
        }
        uniqueSubjects.push(subObject)
      }
      else {
        filtered[0].sections.push(sub.sectionId)
      }
    });

    this.subjectList = uniqueSubjects
  }

  addSubject(classId, id, sections) {

    let subjectForm = this.fb.group({
      "subjectId": this.fb.control(id),
      "sections": this.fb.array([])
    })

    if (sections && sections.length > 0) {

      sections.forEach(section => {

        // In case of update section.sectionId will work
        let sectionId = section.sectionId ? section.sectionId : section

        let fbGroup = this.fb.group({
          "sectionId": this.fb.control(sectionId),
          "students": this.fb.array([])
        });

        if (this.initialFormValues) {
          let sub = this.initialFormValues.subject && this.initialFormValues.subject.find(x => x["subjectId"]["$oid"] === id["$oid"])
          let sec = sub && sub.sections.find(x => x.sectionId === sectionId)
          let students = sec && sec.students
          this.mapStudentForSubject(students, <FormArray>fbGroup.get("students"));
        }
        else {
          // When creating new Exam
          let filteredData = this.ClassSectionWiseStudents.find(x => x["_id"]["classId"]["$oid"] === classId["$oid"] && x["_id"]["sectionId"] === sectionId)
          let students = filteredData && filteredData.students ? filteredData.students : null
          this.mapStudentForSubject(students, <FormArray>fbGroup.get("students"));
        }

        (<FormArray>subjectForm.get("sections")).push(fbGroup)
      }
      );
    }

    // Finally add this subject in the subject array
    (<FormArray>this.form.get('subject')).push(subjectForm)
  }

  mapStudentForSubject(students, studentsControl) {

    if (!(students && studentsControl)) {
      return
    }

    students.forEach(stu => {

      let studentId = stu.studentId ? stu.studentId : stu
      let marksGained = stu.marksGained

      let fbGroup = this.fb.group({
        "studentId": this.fb.control(studentId),
        "marksGained": this.fb.control(marksGained)
      })
      studentsControl.push(fbGroup)
    });

  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}