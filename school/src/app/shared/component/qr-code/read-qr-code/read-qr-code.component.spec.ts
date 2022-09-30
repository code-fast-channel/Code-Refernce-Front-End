import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadQrCodeComponent } from './read-qr-code.component';

describe('ReadQrCodeComponent', () => {
  let component: ReadQrCodeComponent;
  let fixture: ComponentFixture<ReadQrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadQrCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
