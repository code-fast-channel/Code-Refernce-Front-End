import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ROWComponent } from './row.component';

describe('ROWComponent', () => {
  let component: ROWComponent;
  let fixture: ComponentFixture<ROWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ROWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ROWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
