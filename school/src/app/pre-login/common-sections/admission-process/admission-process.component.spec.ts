import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionProcessComponent } from './admission-process.component';

describe('AdmissionProcessComponent', () => {
  let component: AdmissionProcessComponent;
  let fixture: ComponentFixture<AdmissionProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
