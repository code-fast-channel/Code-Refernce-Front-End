import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAccordianComponent } from './exam-accordian.component';

describe('ExamAccordianComponent', () => {
  let component: ExamAccordianComponent;
  let fixture: ComponentFixture<ExamAccordianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamAccordianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
