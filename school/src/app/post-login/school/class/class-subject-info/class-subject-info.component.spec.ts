import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSubjectInfoComponent } from './class-subject-info.component';

describe('ClassSubjectInfoComponent', () => {
  let component: ClassSubjectInfoComponent;
  let fixture: ComponentFixture<ClassSubjectInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSubjectInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSubjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
