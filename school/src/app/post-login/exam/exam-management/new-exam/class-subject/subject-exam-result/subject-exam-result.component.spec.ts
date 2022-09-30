import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectExamResultComponent } from './subject-exam-result.component';

describe('SubjectExamResultComponent', () => {
  let component: SubjectExamResultComponent;
  let fixture: ComponentFixture<SubjectExamResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectExamResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
