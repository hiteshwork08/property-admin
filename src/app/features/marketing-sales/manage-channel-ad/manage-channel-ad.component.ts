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
import {
  ChannelAds,
  ChannelAdsResFormAdaptor,
} from './Manage-channel-ad.adaptor';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import { ToastrService } from 'ngx-toastr';

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
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    MatIconModule,
  ],
  templateUrl: './manage-channel-ad.component.html',
  styleUrls: ['./manage-channel-ad.component.scss'],
  providers: [provideFormAdaptor(ChannelAdsResFormAdaptor, true)],
})
export class ManageChannelAdComponent {
  isEditMode = false;
  editData: ChannelAds | null = null;
  showForm = false;
  form: FormGroup = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    channelId: new FormControl<string>(''),
    channelAdId: new FormControl<string>('', Validators.required),
  });
  channelAds: ChannelAds[] = [];
  displayedColumns: string[] = ['id', 'channelId', 'channelAdId', 'actions'];

  channelIds: string[] = ['ChannelID1', 'ChannelID2', 'ChannelID3'];

  constructor(
    private toastr: ToastrService,
    private channelAdsResFormAdaptor: ChannelAdsResFormAdaptor
  ) {
    this.channelAdsResFormAdaptor.formData$.subscribe(() => {
      if (this.editData) {
        this.onUpdate();
      } else {
        this.addItem();
      }
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
      (item) => item.id === itemToDelete.id
    );
    if (index !== -1) {
      this.channelAds.splice(index, 1);
      this.channelAds = [...this.channelAds];
      this.toastr.success('Chaneel Ads deleted successfully.');
      this.recalculatePositions();
    }
  }

  addItem() {
    const newItem = this.form.value;
    newItem.id = this.channelAds.length + 1;
    this.channelAds.push(newItem);
    this.channelAds = [...this.channelAds];
    this.restAll();
    this.recalculatePositions();
    this.toastr.success('Chaneel Ads successfully.');
  }

  onUpdate() {
    if (this.form.valid) {
      const formData = this.form.value;
      const index = this.channelAds.findIndex(
        (item) => item.id === formData.id
      );
      if (index !== -1) {
        this.channelAds[index] = formData;
      }
      this.channelAds = [...this.channelAds];
      this.restAll();
      this.toastr.success('Chaneel Ads updated successfully.');
    }
  }

  private recalculatePositions() {
    for (let i = 0; i < this.channelAds.length; i++) {
      this.channelAds[i].id = i + 1;
    }
  }

  restAll() {
    this.isEditMode = false;
    this.editData = null;
    this.showForm = false;
    this.form.reset();
  }
}
