import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveDocsComponent } from './receive-docs.component';

describe('ReceiveDocsComponent', () => {
  let component: ReceiveDocsComponent;
  let fixture: ComponentFixture<ReceiveDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveDocsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
