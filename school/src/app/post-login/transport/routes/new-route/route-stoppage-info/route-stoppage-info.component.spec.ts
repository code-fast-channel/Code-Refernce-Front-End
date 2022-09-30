import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteStoppageInfoComponent } from './route-stoppage-info.component';

describe('RouteStoppageInfoComponent', () => {
  let component: RouteStoppageInfoComponent;
  let fixture: ComponentFixture<RouteStoppageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteStoppageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteStoppageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
