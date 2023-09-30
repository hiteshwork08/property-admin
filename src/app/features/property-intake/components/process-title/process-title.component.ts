import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ReactiveFormsModule,  } from "@angular/forms";
import { SubmitProcessTitleFormAdaptor } from './process-title.adaptor';
import { FormHandlerModule, provideFormAdaptor } from '@common/form/form.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import { FetchModule } from '@common/fetch/fetch.directive';

@Component({
  selector: 'app-process-title',
  standalone: true,
  imports: [CommonModule,MatButtonModule,ReactiveFormsModule,FetchModule,FormErrorModule,FormHandlerModule],
  templateUrl: './process-title.component.html',
  styleUrls: ['./process-title.component.scss'],
  providers: [provideFormAdaptor(SubmitProcessTitleFormAdaptor, true)],
})
export class ProcessTitleComponent {
  files: File[] = [];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      images: ['',Validators.required]
    });
  }

   get images() {
      return this.form.controls['images']
    }

    onFileDrop(event :Event) {
    const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) 
      this.images.setValue(inputElement.files[0]);
  }
 

  deleteFile() {
    this.images.reset();
  }


}

// deedForm: FormGroup;

// constructor(private formBuilder: FormBuilder) {}

// get deedDocument() {
//   return this.deedForm.controls['deedDocument']
// }

// ngOnInit(): void {
//   this.deedForm = this.formBuilder.group({
//     deedDocument: ['', Validators.required],
//   });
// }

// onFileDrop(event: Event) {
//   const inputElement = event.target as HTMLInputElement;
//   if (inputElement.files && inputElement.files.length > 0) 
//   this.deedDocument.setValue(inputElement.files[0]);
  
// }

// removeFile() {
//   this.deedDocument.reset();
// }


