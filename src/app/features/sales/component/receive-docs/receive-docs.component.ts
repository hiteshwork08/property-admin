import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { ReceiveDocsFormAdaptor } from './receive-docs.adaptor';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';

@Component({
  selector: 'app-receive-docs',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    MatSlideToggleModule,
    MatButtonModule,
    ReadOnlyFormDirective,
    DropFilesComponent,
  ],
  templateUrl: './receive-docs.component.html',
  styleUrls: ['./receive-docs.component.scss'],
  providers: [provideFormAdaptor(ReceiveDocsFormAdaptor, true)],
})
export class ReceiveDocsComponent {
  @Input() readOnly = false;
  form = new FormGroup({
    buyerDoc: new FormControl<File | FileList>(null, Validators.required),
  });

  get buyerDoc() {
    return this.form.controls['buyerDoc'];
  }

  onFileDropped(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0)
      this.buyerDoc.setValue(inputElement.files[0]);
  }

  removeFile() {
    this.buyerDoc.reset();
  }

  get isSaveButtonEnabled() {
    return this.buyerDoc.valid;
  }
}
