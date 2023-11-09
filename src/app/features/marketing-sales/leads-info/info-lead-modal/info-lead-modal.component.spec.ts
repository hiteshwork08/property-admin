import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLeadModalComponent } from './info-lead-modal.component';

describe('InfoLeadModalComponent', () => {
  let component: InfoLeadModalComponent;
  let fixture: ComponentFixture<InfoLeadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoLeadModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoLeadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
