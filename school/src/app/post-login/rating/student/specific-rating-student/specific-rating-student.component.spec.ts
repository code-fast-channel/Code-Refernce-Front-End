import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificRatingStudentComponent } from './specific-rating-student.component';

describe('SpecificRatingStudentComponent', () => {
  let component: SpecificRatingStudentComponent;
  let fixture: ComponentFixture<SpecificRatingStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificRatingStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificRatingStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
