import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitializeSalesComponent } from './initialize-sales.component';

describe('InitializeSalesComponent', () => {
  let component: InitializeSalesComponent;
  let fixture: ComponentFixture<InitializeSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitializeSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitializeSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
