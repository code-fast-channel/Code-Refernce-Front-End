import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayAccordianComponent } from './holiday-accordian.component';

describe('HolidayAccordianComponent', () => {
  let component: HolidayAccordianComponent;
  let fixture: ComponentFixture<HolidayAccordianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayAccordianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
