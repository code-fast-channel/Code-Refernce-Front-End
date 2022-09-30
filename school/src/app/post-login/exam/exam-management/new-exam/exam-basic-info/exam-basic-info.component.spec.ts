import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamBasicInfoComponent } from './exam-basic-info.component';

describe('ExamBasicInfoComponent', () => {
  let component: ExamBasicInfoComponent;
  let fixture: ComponentFixture<ExamBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
