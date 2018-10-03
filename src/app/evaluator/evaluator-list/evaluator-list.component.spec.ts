import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorListComponent } from './evaluator-list.component';

describe('EvaluatorListComponent', () => {
  let component: EvaluatorListComponent;
  let fixture: ComponentFixture<EvaluatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
