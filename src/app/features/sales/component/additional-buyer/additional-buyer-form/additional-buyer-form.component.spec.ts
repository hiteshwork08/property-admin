import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalBuyerFormComponent } from './additional-buyer-form.component';

describe('AdditionalBuyerFormComponent', () => {
  let component: AdditionalBuyerFormComponent;
  let fixture: ComponentFixture<AdditionalBuyerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalBuyerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalBuyerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
