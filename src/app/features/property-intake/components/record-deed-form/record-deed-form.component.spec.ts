import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDeedFormComponent } from './record-deed-form.component';

describe('RecordDeedFormComponent', () => {
  let component: RecordDeedFormComponent;
  let fixture: ComponentFixture<RecordDeedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordDeedFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordDeedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
