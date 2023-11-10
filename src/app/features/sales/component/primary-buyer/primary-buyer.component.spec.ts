import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryBuyerComponent } from './primary-buyer.component';

describe('PrimaryBuyerComponent', () => {
  let component: PrimaryBuyerComponent;
  let fixture: ComponentFixture<PrimaryBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
