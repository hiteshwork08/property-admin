import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';

import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { RecordDeedFormAdaptor } from './record-deed-sale.adaptor';

@Component({
  selector: 'app-record-deed-sale',
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
    MatButtonModule,
    ReadOnlyFormDirective,
    DropFilesComponent,
    FormsModule,
  ],
  templateUrl: './record-deed-sale.component.html',
  styleUrls: ['./record-deed-sale.component.scss'],
  providers: [provideFormAdaptor(RecordDeedFormAdaptor, true)],
})
export class RecordDeedSaleComponent {
  checkboxChecked: boolean = false;
  @Input() readOnly = false;
  form = new FormGroup({
    unnotarizedDeed: new FormControl<File | FileList>(
      null,
      Validators.required
    ),
    notarizedDeed: new FormControl<File | FileList>(null, Validators.required),
    recordedDeed: new FormControl<File | FileList>(null, Validators.required),
  });

  get unnotarizedDeed() {
    return this.form.controls['unnotarizedDeed'];
  }
  get notarizedDeed() {
    return this.form.controls['notarizedDeed'];
  }
  get recordedDeed() {
    return this.form.controls['recordedDeed'];
  }

  onFileDropped(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0)
      this.unnotarizedDeed.setValue(inputElement.files[0]);
  }

  removeFile() {
    this.unnotarizedDeed.reset();
    this.notarizedDeed.reset();
    this.recordedDeed.reset();
  }
}
