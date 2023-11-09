import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalBuyerComponent } from './additional-buyer.component';

describe('AdditionalBuyerComponent', () => {
  let component: AdditionalBuyerComponent;
  let fixture: ComponentFixture<AdditionalBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
