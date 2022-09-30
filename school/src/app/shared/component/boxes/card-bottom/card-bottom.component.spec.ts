import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBottomComponent } from './card-bottom.component';

describe('CardBottomComponent', () => {
  let component: CardBottomComponent;
  let fixture: ComponentFixture<CardBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
