import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoginMenuComponent } from './pre-login-menu.component';

describe('PreLoginMenuComponent', () => {
  let component: PreLoginMenuComponent;
  let fixture: ComponentFixture<PreLoginMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreLoginMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoginMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
