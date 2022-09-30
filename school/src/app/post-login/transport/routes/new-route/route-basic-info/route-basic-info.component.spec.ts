import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteBasicInfoComponent } from './route-basic-info.component';

describe('RouteBasicInfoComponent', () => {
  let component: RouteBasicInfoComponent;
  let fixture: ComponentFixture<RouteBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
