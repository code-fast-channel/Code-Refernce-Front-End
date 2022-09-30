import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBasicInfoComponent } from './vehicle-basic-info.component';

describe('VehicleBasicInfoComponent', () => {
  let component: VehicleBasicInfoComponent;
  let fixture: ComponentFixture<VehicleBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
