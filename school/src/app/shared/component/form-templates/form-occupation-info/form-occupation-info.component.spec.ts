import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOccupationInfoComponent } from './form-occupation-info.component';

describe('FormOccupationInfoComponent', () => {
  let component: FormOccupationInfoComponent;
  let fixture: ComponentFixture<FormOccupationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOccupationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOccupationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
