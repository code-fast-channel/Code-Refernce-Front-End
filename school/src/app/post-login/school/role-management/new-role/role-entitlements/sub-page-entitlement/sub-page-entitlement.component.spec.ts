import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPageEntitlementComponent } from './sub-page-entitlement.component';

describe('SubPageEntitlementComponent', () => {
  let component: SubPageEntitlementComponent;
  let fixture: ComponentFixture<SubPageEntitlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubPageEntitlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPageEntitlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
