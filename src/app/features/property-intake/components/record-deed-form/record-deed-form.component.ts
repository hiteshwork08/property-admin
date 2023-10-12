import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { RecordDeedFormAdaptor } from './record-deed-form.adaptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';

@Component({
  selector: 'app-record-deed-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FetchModule,
    FormErrorModule,
    DropFilesComponent,
    FormHandlerModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    ReadOnlyFormDirective,
  ],
  templateUrl: './record-deed-form.component.html',
  styleUrls: ['./record-deed-form.component.scss'],
  providers: [provideFormAdaptor(RecordDeedFormAdaptor, true)],
})
export class RecordDeedFormComponent {
  @Input() readOnly = false;
  deedForm = new FormGroup({
    deedDocument: new FormControl<File | FileList>(null, Validators.required),
  });

  get deedDocument() {
    return this.deedForm.controls['deedDocument'];
  }

  onFileDropped(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0)
      this.deedDocument.setValue(inputElement.files[0]);
  }

  removeFile() {
    this.deedDocument.reset();
  }
}
