import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserCredentialsComponent } from './form-user-credentials.component';

describe('FormUserCredentialsComponent', () => {
  let component: FormUserCredentialsComponent;
  let fixture: ComponentFixture<FormUserCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUserCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
