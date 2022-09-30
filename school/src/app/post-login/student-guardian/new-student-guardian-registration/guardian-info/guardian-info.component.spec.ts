import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianInfoComponent } from './guardian-info.component';

describe('GuardianInfoComponent', () => {
  let component: GuardianInfoComponent;
  let fixture: ComponentFixture<GuardianInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardianInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
