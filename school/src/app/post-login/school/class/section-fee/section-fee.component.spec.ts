import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFeeComponent } from './section-fee.component';

describe('SectionFeeComponent', () => {
  let component: SectionFeeComponent;
  let fixture: ComponentFixture<SectionFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
