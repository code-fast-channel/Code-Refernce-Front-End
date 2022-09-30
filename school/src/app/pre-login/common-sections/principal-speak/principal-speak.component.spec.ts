import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalSpeakComponent } from './principal-speak.component';

describe('PrincipalSpeakComponent', () => {
  let component: PrincipalSpeakComponent;
  let fixture: ComponentFixture<PrincipalSpeakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalSpeakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalSpeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
