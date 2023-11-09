import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadInfoManagerComponent } from './lead-info-manager.component';

describe('LeadInfoManagerComponent', () => {
  let component: LeadInfoManagerComponent;
  let fixture: ComponentFixture<LeadInfoManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LeadInfoManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadInfoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
