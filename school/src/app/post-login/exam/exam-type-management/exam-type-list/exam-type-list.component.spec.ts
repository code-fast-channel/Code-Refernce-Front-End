import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTypeListComponent } from './exam-type-list.component';

describe('ExamTypeListComponent', () => {
  let component: ExamTypeListComponent;
  let fixture: ComponentFixture<ExamTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
