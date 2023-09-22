import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveOfferFormComponent } from './receive-offer-form.component';

describe('ReceiveOfferFormComponent', () => {
  let component: ReceiveOfferFormComponent;
  let fixture: ComponentFixture<ReceiveOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveOfferFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
