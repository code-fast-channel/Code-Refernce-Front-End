import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamReportCardComponent } from './exam-report-card.component';

describe('ExamReportCardComponent', () => {
  let component: ExamReportCardComponent;
  let fixture: ComponentFixture<ExamReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamReportCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
