import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelFormComponent } from './cancel-btn.component';

describe('CancelFormComponent', () => {
  let component: CancelFormComponent;
  let fixture: ComponentFixture<CancelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
