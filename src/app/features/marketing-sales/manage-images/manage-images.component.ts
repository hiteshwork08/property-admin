import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Image } from '../manage-images/manage-images.model';
@Component({
  selector: 'app-manage-images',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DropFilesComponent,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.scss'],
})
export class ManageImagesComponent {
  isEditMode = false;
  editData: Image | null = null;
  showForm = false;
  form: FormGroup;
  Items: Image[] = [];
  displayedColumns: string[] = [
    'position',
    'ImageDescription',
    'ImageFile',
    'actions',
  ];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      ImageDescription: ['', Validators.required],
      ImageFile: [''],
    });
  }

  openEditDialog(row: Image) {
    this.isEditMode = true;
    this.editData = { ...row };
    this.showForm = true;
    this.form.patchValue(this.editData);
  }
  get ImageFileControl() {
    return this.form.controls['ImageFile'];
  }

  ngOnInit(): void {}

  deleteItem(itemToDelete: Image) {
    const index = this.Items.findIndex(
      (item) => item.position === itemToDelete.position
    );
    if (index !== -1) {
      this.Items.splice(index, 1);
      this.Items = [...this.Items];
      this.recalculatePositions();
    }
  }

  addItem(newItem: Image) {
    newItem.position = this.Items.length + 1;
    this.Items.push(newItem);
    this.Items = [...this.Items];
    this.form.reset();
    this.recalculatePositions();
  }

  updateItem(updatedItem: Image) {
    const index = this.Items.findIndex(
      (item) => item.position === updatedItem.position
    );
    if (index !== -1) {
      this.Items[index] = updatedItem;
    }
  }

  onUpdate() {
    if (this.form.valid) {
      const formData = this.form.value;
      const updatedImage: Image = {
        ...this.editData!,
        ImageDescription: formData.ImageDescription,
        ImageFile: formData.ImageFile,
      };

      this.updateItem(updatedImage);
      this.Items = [...this.Items];
      this.form.reset();
      this.isEditMode = false;
      this.editData = null;
      this.showForm = false;
    }
  }

  private recalculatePositions() {
    for (let i = 0; i < this.Items.length; i++) {
      this.Items[i].position = i + 1;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const selectedFiles = formData.ImageFile;
      const newImage: Image = {
        position: 0,
        ImageDescription: formData.ImageDescription,
        ImageFile: selectedFiles,
      };

      this.addItem(newImage);
      this.form.reset();
      this.showForm = false;
    }
  }

  onFileDropped(files: any) {
    this.form.get('ImageFile')?.setValue(files);
  }

  deleteFile() {
    this.form.get('ImageFile')?.reset();
  }

  onCancel() {
    this.isEditMode = false;
    this.editData = null;
    this.showForm = false;
  }
}
