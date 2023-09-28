import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedDocsFormComponent } from './received-docs-form.component';

describe('ReceivedDocsFormComponent', () => {
  let component: ReceivedDocsFormComponent;
  let fixture: ComponentFixture<ReceivedDocsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedDocsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedDocsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
