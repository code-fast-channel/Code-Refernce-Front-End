import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkStudentRatingComponent } from './mark-student-rating.component';

describe('MarkStudentRatingComponent', () => {
  let component: MarkStudentRatingComponent;
  let fixture: ComponentFixture<MarkStudentRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkStudentRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkStudentRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
