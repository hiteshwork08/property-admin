import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { ReceivedDocsFormAdaptor } from './received-doc-form.adaptor';

@Component({
  selector: 'app-received-docs-form',
  standalone: true,
  imports: [
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './received-docs-form.component.html',
  styleUrls: ['./received-docs-form.component.scss'],
  providers: [provideFormAdaptor(ReceivedDocsFormAdaptor, true)],
})
export class ReceivedDocsFormComponent {
  files: any[] = [];
  form: FormGroup;
  showUploadField = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      deedDocument: ['', Validators.required],
      deednotes: [''],
      salesAgreementDocument: ['', Validators.required],
      salesAgreementNotes: [''],
    });
  }

  get salesAgreementDocument() {
    return this.form.controls['salesAgreementDocument'];
  }

  get deedDocument() {
    return this.form.controls['deedDocument'];
  }

  toggleUploadField() {
    this.showUploadField = !this.showUploadField;
  }
  isSaveButtonEnabled() {
    return this.deedDocument.valid || this.salesAgreementDocument.valid;
  }

  onFileDropped(event: Event, control: AbstractControl) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      control.setValue(inputElement.files[0]);
    }
  }

  resetControl(control: AbstractControl) {
    control.reset();
  }
}
