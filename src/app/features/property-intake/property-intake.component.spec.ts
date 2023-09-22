import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyIntakeComponent } from './property-intake.component';

describe('PropertyIntakeComponent', () => {
  let component: PropertyIntakeComponent;
  let fixture: ComponentFixture<PropertyIntakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyIntakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
