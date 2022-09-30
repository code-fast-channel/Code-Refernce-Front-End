import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdlRelationComponent } from './ddl-relation.component';

describe('DdlRelationComponent', () => {
  let component: DdlRelationComponent;
  let fixture: ComponentFixture<DdlRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdlRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdlRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
