import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCodeNameComponent } from './form-code-name.component';

describe('FormCodeNameComponent', () => {
  let component: FormCodeNameComponent;
  let fixture: ComponentFixture<FormCodeNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCodeNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCodeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
