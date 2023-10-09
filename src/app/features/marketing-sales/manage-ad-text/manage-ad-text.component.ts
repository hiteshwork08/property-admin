import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';

export class adsDetails {
  position: number;
  title: string;
  adtext: string;
}

@Component({
  selector: 'app-manage-ad-text',
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
  templateUrl: './manage-ad-text.component.html',
  styleUrls: ['./manage-ad-text.component.scss'],
})
export class ManageAdTextComponent {
  isEditMode = false;
  editData: adsDetails | null = null;
  showForm = false;
  form: FormGroup;
  AdsDetails: adsDetails[] = [];
  displayedColumns: string[] = ['position', 'title', 'adtext', 'actions'];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      adtext: ['', Validators.required],
    });
  }

  openEditDialog(row: adsDetails) {
    this.isEditMode = true;
    this.editData = { ...row };
    this.showForm = true;
    this.form.patchValue(this.editData);
  }

  ngOnInit(): void {}

  deleteItem(itemToDelete: adsDetails) {
    const index = this.AdsDetails.findIndex(
      (item) => item.position === itemToDelete.position
    );
    if (index !== -1) {
      this.AdsDetails.splice(index, 1);
      this.AdsDetails = [...this.AdsDetails];
      this.recalculatePositions();
    }
  }

  addItem(newItem: adsDetails) {
    newItem.position = this.AdsDetails.length + 1;
    this.AdsDetails.push(newItem);
    this.AdsDetails = [...this.AdsDetails];
    this.form.reset();
    this.recalculatePositions();
  }

  updateItem(updatedItem: adsDetails) {
    const index = this.AdsDetails.findIndex(
      (item) => item.position === updatedItem.position
    );
    if (index !== -1) {
      this.AdsDetails[index] = updatedItem;
    }
  }

  onUpdate() {
    if (this.form.valid) {
      const formData = this.form.value;
      const updatedAds: adsDetails = {
        ...this.editData!,
        title: formData.title,
        adtext: formData.adtext,
      };

      this.updateItem(updatedAds);
      this.AdsDetails = [...this.AdsDetails];
      this.form.reset();
      this.isEditMode = false;
      this.editData = null;
      this.showForm = false;
    }
  }

  private recalculatePositions() {
    for (let i = 0; i < this.AdsDetails.length; i++) {
      this.AdsDetails[i].position = i + 1;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const updatedAds: adsDetails = {
        position: 0,
        title: formData.title,
        adtext: formData.adtext,
      };

      this.addItem(updatedAds);
      this.form.reset();
      this.showForm = false;
    }
  }

  onCancel() {
    this.isEditMode = false;
    this.editData = null;
    this.showForm = false;
  }
}
