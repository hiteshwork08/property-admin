import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitProcessTitleFormAdaptor } from './process-title.adaptor';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import { FetchModule } from '@common/fetch/fetch.directive';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';

@Component({
  selector: 'app-process-title',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    DropFilesComponent,
    ReactiveFormsModule,
    FetchModule,
    FormErrorModule,
    FormHandlerModule,
  ],
  templateUrl: './process-title.component.html',
  styleUrls: ['./process-title.component.scss'],
  providers: [provideFormAdaptor(SubmitProcessTitleFormAdaptor, true)],
})
export class ProcessTitleComponent {
  @Input() readOnly = false;
  files: File[] = [];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      images: ['', Validators.required],
    });
  }

  get images() {
    return this.form.controls['images'];
  }

  onFileDropped(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0)
      this.images.setValue(inputElement.files[0]);
  }

  deleteFile() {
    this.images.reset();
  }
}
