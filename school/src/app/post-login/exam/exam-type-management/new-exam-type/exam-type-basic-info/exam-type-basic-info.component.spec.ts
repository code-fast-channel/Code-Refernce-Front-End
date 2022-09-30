import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTypeBasicInfoComponent } from './exam-type-basic-info.component';

describe('ExamTypeBasicInfoComponent', () => {
  let component: ExamTypeBasicInfoComponent;
  let fixture: ComponentFixture<ExamTypeBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamTypeBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTypeBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
