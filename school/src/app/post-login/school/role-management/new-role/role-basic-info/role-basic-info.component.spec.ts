import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleBasicInfoComponent } from './role-basic-info.component';

describe('RoleBasicInfoComponent', () => {
  let component: RoleBasicInfoComponent;
  let fixture: ComponentFixture<RoleBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
