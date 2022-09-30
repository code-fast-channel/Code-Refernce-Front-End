import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFormatComponent } from './panel-format.component';

describe('PanelFormatComponent', () => {
  let component: PanelFormatComponent;
  let fixture: ComponentFixture<PanelFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
