import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeScriptFormComponent } from './intake-script-form.component';

describe('IntakeScriptFormComponent', () => {
  let component: IntakeScriptFormComponent;
  let fixture: ComponentFixture<IntakeScriptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntakeScriptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntakeScriptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
