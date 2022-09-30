import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWholeRatingComponent } from './student-whole-rating.component';

describe('StudentWholeRatingComponent', () => {
  let component: StudentWholeRatingComponent;
  let fixture: ComponentFixture<StudentWholeRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentWholeRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWholeRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
