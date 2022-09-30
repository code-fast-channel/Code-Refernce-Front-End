import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEntitlementsComponent } from './role-entitlements.component';

describe('RoleEntitlementsComponent', () => {
  let component: RoleEntitlementsComponent;
  let fixture: ComponentFixture<RoleEntitlementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleEntitlementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleEntitlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
