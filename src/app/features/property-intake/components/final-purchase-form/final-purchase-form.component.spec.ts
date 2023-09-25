import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPurchaseFormComponent } from './final-purchase-form.component';

describe('FinalPurchaseFormComponent', () => {
  let component: FinalPurchaseFormComponent;
  let fixture: ComponentFixture<FinalPurchaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalPurchaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalPurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
