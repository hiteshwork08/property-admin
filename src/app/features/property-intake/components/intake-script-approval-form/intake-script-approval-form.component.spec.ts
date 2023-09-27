import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeScriptApprovalFormComponent } from './intake-script-approval-form.component';

describe('IntakeScriptApprovalFormComponent', () => {
  let component: IntakeScriptApprovalFormComponent;
  let fixture: ComponentFixture<IntakeScriptApprovalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntakeScriptApprovalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntakeScriptApprovalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
