import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreMarketingApprovalComponent } from './pre-marketing-approval.component';

describe('PreMarketingApprovalComponent', () => {
  let component: PreMarketingApprovalComponent;
  let fixture: ComponentFixture<PreMarketingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PreMarketingApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreMarketingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
