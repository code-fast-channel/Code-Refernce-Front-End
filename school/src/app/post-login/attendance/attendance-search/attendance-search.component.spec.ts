import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSearchComponent } from './attendance-search.component';

describe('AttendanceSearchComponent', () => {
  let component: AttendanceSearchComponent;
  let fixture: ComponentFixture<AttendanceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
