import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';
import { ManageImagesComponent } from '../manage-images.component';
import { MatButtonModule } from '@angular/material/button';

export interface Image {
  ClientPropertyID: string;
  ImageDescription: string;
  File: File | null;
}

@Component({
  selector: 'app-add-manage-data',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DropFilesComponent,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './add-manage-data.component.html',
  styleUrls: ['./add-manage-data.component.scss'],
})
export class AddManageDataComponent {
  imageForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ManageImagesComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Image
  ) {}

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      ClientPropertyID: ['', Validators.required],
      ImageDescription: ['', Validators.required],
      ImageFile: [null],
    });
  }

  onSubmit() {}
  get pictures() {
    return this.formBuilder['pictures'];
  }

  onFileDropped(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const fileList: FileList = inputElement.files;
      this.pictures.setValue(fileList);
    }
  }

  deleteFile() {
    this.pictures.reset();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
