import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCompleteFormComponent } from './payment-complete-form.component';

describe('PaymentCompleteFormComponent', () => {
  let component: PaymentCompleteFormComponent;
  let fixture: ComponentFixture<PaymentCompleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCompleteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCompleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
