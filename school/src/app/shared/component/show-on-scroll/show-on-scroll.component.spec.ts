import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOnScrollComponent } from './show-on-scroll.component';

describe('ShowOnScrollComponent', () => {
  let component: ShowOnScrollComponent;
  let fixture: ComponentFixture<ShowOnScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOnScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOnScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
