import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingSearchComponent } from './rating-search.component';

describe('RatingSearchComponent', () => {
  let component: RatingSearchComponent;
  let fixture: ComponentFixture<RatingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
