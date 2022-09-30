import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianReviewsComponent } from './guardian-reviews.component';

describe('GuardianReviewsComponent', () => {
  let component: GuardianReviewsComponent;
  let fixture: ComponentFixture<GuardianReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardianReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
