import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayBasicInfoComponent } from './holiday-basic-info.component';

describe('HolidayBasicInfoComponent', () => {
  let component: HolidayBasicInfoComponent;
  let fixture: ComponentFixture<HolidayBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
