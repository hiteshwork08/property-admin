import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDetailsInfoComponent } from './sales-details-info.component';

describe('SalesDetailsInfoComponent', () => {
  let component: SalesDetailsInfoComponent;
  let fixture: ComponentFixture<SalesDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesDetailsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
