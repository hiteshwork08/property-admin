import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChannelAdComponent } from './manage-channel-ad.component';

describe('ManageChannelAdComponent', () => {
  let component: ManageChannelAdComponent;
  let fixture: ComponentFixture<ManageChannelAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ManageChannelAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageChannelAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
