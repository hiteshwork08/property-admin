import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
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
import {
  Image,
  ImageFormAdaptor,
} from '../manage-images/manage-images.adaptor';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import { ToastrService } from 'ngx-toastr';
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
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
  ],
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.scss'],
  providers: [provideFormAdaptor(ImageFormAdaptor, true)],
})
export class ManageImagesComponent {
  isEditMode = false;
  editData: Image | null = null;
  showForm = false;
  form: FormGroup = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    ImageDescription: new FormControl<string>('', Validators.required),
    ImageFile: new FormControl<FileList | null>(null),
  });
  Items: Image[] = [];
  displayedColumns: string[] = [
    'id',
    'ImageDescription',
    'ImageFile',
    'actions',
  ];

  constructor(
    private toastr: ToastrService,
    private imageFormAdaptor: ImageFormAdaptor
  ) {
    this.imageFormAdaptor.imageData$.subscribe(() => {
      if (this.editData) {
        this.onUpdate();
      } else {
        this.addItem();
      }
    });
  }

  openEditDialog(row: Image) {
    this.isEditMode = true;
    this.editData = { ...row };
    this.showForm = true;
    this.form.patchValue(this.editData);
  }

  ngOnInit(): void {}

  get ImageFileControl() {
    return this.form.get('ImageFile') as FormControl;
  }

  deleteItem(itemToDelete: Image) {
    const index = this.Items.findIndex((item) => item.id === itemToDelete.id);
    if (index !== -1) {
      this.Items.splice(index, 1);
      this.Items = [...this.Items];
      this.toastr.success('Image details deleted successfully.');
      this.recalculatePositions();
    }
  }
  addItem() {
    const newItem = this.form.value;
    newItem.id = this.Items.length + 1;
    this.Items.push(newItem);
    this.Items = [...this.Items];
    this.resetAll();
    this.recalculatePositions();
    this.toastr.success('Image details added successfully.');
  }

  onUpdate() {
    if (this.form.valid) {
      const imageData = this.form.value;

      const index = this.Items.findIndex((item) => item.id === imageData.id);
      if (index !== -1) {
        this.Items[index] = imageData;
      }
      this.Items = [...this.Items];
      this.resetAll();
      this.toastr.success('Image details updated successfully.');
    }
  }

  private recalculatePositions() {
    for (let i = 0; i < this.Items.length; i++) {
      this.Items[i].id = i + 1;
    }
  }

  onFileDropped(files: any) {
    this.ImageFileControl.setValue(files);
  }

  deleteFile() {
    this.ImageFileControl.reset();
  }

  resetAll() {
    this.isEditMode = false;
    this.editData = null;
    this.showForm = false;
    this.form.reset();
  }
}
