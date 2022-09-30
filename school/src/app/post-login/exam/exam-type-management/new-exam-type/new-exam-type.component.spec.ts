import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExamTypeComponent } from './new-exam-type.component';

describe('NewExamTypeComponent', () => {
  let component: NewExamTypeComponent;
  let fixture: ComponentFixture<NewExamTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExamTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
