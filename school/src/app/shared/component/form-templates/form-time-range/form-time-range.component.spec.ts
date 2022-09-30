import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTimeRangeComponent } from './form-time-range.component';

describe('FormTimeRangeComponent', () => {
  let component: FormTimeRangeComponent;
  let fixture: ComponentFixture<FormTimeRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTimeRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTimeRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
