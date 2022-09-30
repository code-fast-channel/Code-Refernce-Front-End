import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSchoolRulesComponent } from './general-school-rules.component';

describe('GeneralSchoolRulesComponent', () => {
  let component: GeneralSchoolRulesComponent;
  let fixture: ComponentFixture<GeneralSchoolRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSchoolRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSchoolRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
