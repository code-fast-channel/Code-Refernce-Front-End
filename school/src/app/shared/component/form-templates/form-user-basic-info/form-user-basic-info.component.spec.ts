import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserBasicInfoComponent } from './form-user-basic-info.component';

describe('FormUserBasicInfoComponent', () => {
  let component: FormUserBasicInfoComponent;
  let fixture: ComponentFixture<FormUserBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUserBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
