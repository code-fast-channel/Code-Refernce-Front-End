import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularFormatComponent } from './tabular-format.component';

describe('TabularFormatComponent', () => {
  let component: TabularFormatComponent;
  let fixture: ComponentFixture<TabularFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabularFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
