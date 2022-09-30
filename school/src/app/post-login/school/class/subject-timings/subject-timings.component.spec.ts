import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectTimingsComponent } from './subject-timings.component';

describe('SubjectTimingsComponent', () => {
  let component: SubjectTimingsComponent;
  let fixture: ComponentFixture<SubjectTimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectTimingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
