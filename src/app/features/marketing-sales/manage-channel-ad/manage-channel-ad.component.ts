import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

interface ChannelAds {
  position: number;
  channelId: string;
  channelAdId: string;
}
@Component({
  selector: 'app-manage-channel-ad',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './manage-channel-ad.component.html',
  styleUrls: ['./manage-channel-ad.component.scss'],
})
export class ManageChannelAdComponent {
  isEditMode = false;
  editData: ChannelAds | null = null;
  showForm = false;
  form: FormGroup;
  channelAds: ChannelAds[] = [];
  displayedColumns: string[] = [
    'position',
    'channelId',
    'channelAdId',
    'actions',
  ];

  channelIds: string[] = ['ChannelID1', 'ChannelID2', 'ChannelID3'];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      channelId: [this.channelIds, Validators.required],
      channelAdId: ['', Validators.required],
    });
  }

  openEditDialog(row: ChannelAds) {
    this.isEditMode = true;
    this.editData = { ...row };
    this.showForm = true;
    this.form.patchValue(this.editData);
  }

  ngOnInit(): void {}

  deleteItem(itemToDelete: ChannelAds) {
    const index = this.channelAds.findIndex(
      (item) => item.position === itemToDelete.position
    );
    if (index !== -1) {
      this.channelAds.splice(index, 1);
      this.recalculatePositions();
    }
  }

  addItem(newItem: ChannelAds) {
    newItem.position = this.channelAds.length + 1;
    this.channelAds.push(newItem);
    this.channelAds = [...this.channelAds];
    this.form.reset();
    this.recalculatePositions();
  }

  updateItem(updatedItem: ChannelAds) {
    const index = this.channelAds.findIndex(
      (item) => item.position === updatedItem.position
    );
    if (index !== -1) {
      this.channelAds[index] = updatedItem;
    }
    this.channelAds = [...this.channelAds];
  }

  onUpdate() {
    if (this.form.valid) {
      const formData = this.form.value;
      const updatedAds: ChannelAds = {
        ...this.editData!,
        channelId: formData.channelId,
        channelAdId: formData.channelAdId,
      };
      this.updateItem(updatedAds);

      this.form.reset();
      this.isEditMode = false;
      this.editData = null;
      this.showForm = false;
    }
  }

  private recalculatePositions() {
    for (let i = 0; i < this.channelAds.length; i++) {
      this.channelAds[i].position = i + 1;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const newAd: ChannelAds = {
        position: 0,
        channelId: formData.channelId,
        channelAdId: formData.channelAdId,
      };

      this.addItem(newAd);
      this.showForm = false;
    }
  }

  onCancel() {
    this.isEditMode = false;
    this.editData = null;
    this.showForm = false;
  }
}
