import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRouteInfoComponent } from './vehicle-route-info.component';

describe('VehicleRouteInfoComponent', () => {
  let component: VehicleRouteInfoComponent;
  let fixture: ComponentFixture<VehicleRouteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleRouteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRouteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
