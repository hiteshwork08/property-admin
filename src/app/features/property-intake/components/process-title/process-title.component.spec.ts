import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTitleComponent } from './process-title.component';

describe('ProcessTitleComponent', () => {
  let component: ProcessTitleComponent;
  let fixture: ComponentFixture<ProcessTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
