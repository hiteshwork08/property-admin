import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
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
import { DropFilesComponent } from '@common/drop-files/drop-files.component';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';

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
    DropFilesComponent,
    FetchModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    ReadOnlyFormDirective,
  ],
  templateUrl: './received-docs-form.component.html',
  styleUrls: ['./received-docs-form.component.scss'],
  providers: [provideFormAdaptor(ReceivedDocsFormAdaptor, true)],
})
export class ReceivedDocsFormComponent {
  @Input() readOnly = true;

  form = new FormGroup({
    deedDocument: new FormControl<File | FileList>(null, Validators.required),
    salesAgreementDocument: new FormControl<File | FileList>(
      null,
      Validators.required
    ),
    notes: new FormControl<string>(''),
  });

  get salesAgreementDocument() {
    return this.form.controls['salesAgreementDocument'];
  }

  get deedDocument() {
    return this.form.controls['deedDocument'];
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
