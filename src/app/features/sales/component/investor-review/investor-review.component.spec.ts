import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorReviewComponent } from './investor-review.component';

describe('InvestorReviewComponent', () => {
  let component: InvestorReviewComponent;
  let fixture: ComponentFixture<InvestorReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
