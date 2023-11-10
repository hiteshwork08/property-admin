import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryBuyerFormComponent } from './primary-buyer-form.component';

describe('PrimaryBuyerFormComponent', () => {
  let component: PrimaryBuyerFormComponent;
  let fixture: ComponentFixture<PrimaryBuyerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryBuyerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryBuyerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
