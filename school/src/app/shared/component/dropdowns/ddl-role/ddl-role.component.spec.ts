import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdlRoleComponent } from './ddl-role.component';

describe('DdlRoleComponent', () => {
  let component: DdlRoleComponent;
  let fixture: ComponentFixture<DdlRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdlRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdlRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
