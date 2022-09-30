import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddressInfoComponent } from './form-address-info.component';

describe('FormAddressInfoComponent', () => {
  let component: FormAddressInfoComponent;
  let fixture: ComponentFixture<FormAddressInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddressInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
