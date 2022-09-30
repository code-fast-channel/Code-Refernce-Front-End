import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDdlComponent } from './school-ddl.component';

describe('SchoolDdlComponent', () => {
  let component: SchoolDdlComponent;
  let fixture: ComponentFixture<SchoolDdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolDdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
