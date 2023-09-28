import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import { FormHandlerModule, provideFormAdaptor } from '@common/form/form.directive';
import { RecordDeedFormAdaptor } from './record-deed-form.adaptor';

@Component({
  selector: 'app-record-deed-form',
  standalone: true,
  imports: [CommonModule,MatButtonModule,ReactiveFormsModule,FetchModule,FormErrorModule,FormHandlerModule,FormHandlerModule,
    FormErrorModule],
  templateUrl: './record-deed-form.component.html',
  styleUrls: ['./record-deed-form.component.scss'],
  providers: [provideFormAdaptor(RecordDeedFormAdaptor, true)],
})
export class RecordDeedFormComponent {
  files: File[] = [];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      images: [[], Validators.required],
    });
  }

  onFileDropped(event) {
    this.prepareFileslist(event.target.files);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  prepareFileslist(files) {
    this.files.push(...files);
  }
}
