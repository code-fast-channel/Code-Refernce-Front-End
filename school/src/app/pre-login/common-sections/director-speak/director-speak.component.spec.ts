import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorSpeakComponent } from './director-speak.component';

describe('DirectorSpeakComponent', () => {
  let component: DirectorSpeakComponent;
  let fixture: ComponentFixture<DirectorSpeakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorSpeakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorSpeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
