import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreMarketingCompletedComponent } from './pre-marketing-completed.component';

describe('PreMarketingCompletedComponent', () => {
  let component: PreMarketingCompletedComponent;
  let fixture: ComponentFixture<PreMarketingCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PreMarketingCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreMarketingCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
