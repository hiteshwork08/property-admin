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
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { PrepareDocsFormAdaptor } from './prepare-doc-form.adaptor';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';
@Component({
  selector: 'app-prepare-docs-form',
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
    DropFilesComponent,
    ReadOnlyFormDirective,
  ],
  templateUrl: './prepare-docs-form.component.html',
  styleUrls: ['./prepare-docs-form.component.scss'],
  providers: [provideFormAdaptor(PrepareDocsFormAdaptor, true)],
})
export class PrepareDocsFormComponent {
  @Input() readOnly = false;
  form = new FormGroup({
    deedDocument: new FormControl<File | FileList>(null, Validators.required),
    salesAgreementDocument: new FormControl<File | FileList>(
      null,
      Validators.required
    ),
    notes: new FormControl(''),
  });
  showUploadField = false;

  get salesAgreementDocument() {
    return this.form.controls['salesAgreementDocument'];
  }

  get deedDocument() {
    return this.form.controls['deedDocument'];
  }
  get isSaveButtonEnabled() {
    return this.deedDocument.valid || this.salesAgreementDocument.valid;
  }

  toggleUploadField() {
    this.showUploadField = !this.showUploadField;
  }
}
