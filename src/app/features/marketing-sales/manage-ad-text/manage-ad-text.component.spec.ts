import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdTextComponent } from './manage-ad-text.component';

describe('ManageAdTextComponent', () => {
  let component: ManageAdTextComponent;
  let fixture: ComponentFixture<ManageAdTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ManageAdTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAdTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
