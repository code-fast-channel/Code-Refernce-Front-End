import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeeComponent } from './new-fee.component';

describe('NewFeeComponent', () => {
  let component: NewFeeComponent;
  let fixture: ComponentFixture<NewFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
