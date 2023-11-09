import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDeedSaleComponent } from './record-deed-sale.component';

describe('RecordDeedSaleComponent', () => {
  let component: RecordDeedSaleComponent;
  let fixture: ComponentFixture<RecordDeedSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordDeedSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordDeedSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
