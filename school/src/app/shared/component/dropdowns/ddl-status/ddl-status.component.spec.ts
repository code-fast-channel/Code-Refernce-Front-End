import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdlStatusComponent } from './ddl-status.component';

describe('DdlStatusComponent', () => {
  let component: DdlStatusComponent;
  let fixture: ComponentFixture<DdlStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdlStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdlStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
