import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
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

@Component({
  selector: 'app-record-deed-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FetchModule,
    FormErrorModule,
    FormHandlerModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './record-deed-form.component.html',
  styleUrls: ['./record-deed-form.component.scss'],
  providers: [provideFormAdaptor(RecordDeedFormAdaptor, true)],
})
export class RecordDeedFormComponent {
  deedForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  get deedDocument() {
    return this.deedForm.controls['deedDocument']
  }

  ngOnInit(): void {
    this.deedForm = this.formBuilder.group({
      deedDocument: ['', Validators.required],
    });
  }

  onFileDrop(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) 
    this.deedDocument.setValue(inputElement.files[0]);
    
  }

  removeFile() {
    this.deedDocument.reset();
  }

}
