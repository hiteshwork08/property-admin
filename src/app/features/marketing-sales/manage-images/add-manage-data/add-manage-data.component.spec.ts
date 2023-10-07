import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManageDataComponent } from './add-manage-data.component';

describe('AddManageDataComponent', () => {
  let component: AddManageDataComponent;
  let fixture: ComponentFixture<AddManageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddManageDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
