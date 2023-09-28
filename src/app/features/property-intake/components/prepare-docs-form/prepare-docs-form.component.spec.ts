import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareDocsFormComponent } from './prepare-docs-form.component';

describe('PrepareDocsFormComponent', () => {
  let component: PrepareDocsFormComponent;
  let fixture: ComponentFixture<PrepareDocsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepareDocsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepareDocsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
