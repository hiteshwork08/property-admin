import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { adsDetails, adsDetailsResFormAdaptor } from './Manage-ad-text.adaptor';
import { ToastrService } from 'ngx-toastr';

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
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
  ],
  templateUrl: './manage-ad-text.component.html',
  styleUrls: ['./manage-ad-text.component.scss'],
  providers: [provideFormAdaptor(adsDetailsResFormAdaptor, true)],
})
export class ManageAdTextComponent {
  isEditMode = false;
  editData: adsDetails | null = null;
  showForm = false;
  form: FormGroup = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    title: new FormControl<string>(null, Validators.required),
    adtext: new FormControl<string>(null, Validators.required),
  });
  AdsDetails: adsDetails[] = [];
  displayedColumns: string[] = ['id', 'title', 'adtext', 'actions'];

  constructor(
    private toastr: ToastrService,
    private AdsDetailsResFormAdaptor: adsDetailsResFormAdaptor
  ) {
    this.AdsDetailsResFormAdaptor.formData$.subscribe(() => {
      if (this.editData) {
        this.onUpdate();
      } else {
        this.addItem();
      }
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
      (item) => item.id === itemToDelete.id
    );
    if (index !== -1) {
      this.AdsDetails.splice(index, 1);
      this.AdsDetails = [...this.AdsDetails];
      this.toastr.success('Ad-Details deleted successfully.');
      this.recalculatePositions();
    }
  }

  addItem() {
    const newItem = this.form.value;
    newItem.id = this.AdsDetails.length + 1;
    this.AdsDetails.push(newItem);
    this.AdsDetails = [...this.AdsDetails];
    this.restAll();
    this.recalculatePositions();
    this.toastr.success('Ads-Details added successfully.');
  }

  onUpdate() {
    if (this.form.valid) {
      const formData = this.form.value;
      const index = this.AdsDetails.findIndex(
        (item) => item.id === formData.id
      );
      if (index !== -1) {
        this.AdsDetails[index] = formData;
      }
      this.AdsDetails = [...this.AdsDetails];
      this.restAll();
      this.toastr.success('Ads-Details updated successfully.');
    }
  }

  private recalculatePositions() {
    for (let i = 0; i < this.AdsDetails.length; i++) {
      this.AdsDetails[i].id = i + 1;
    }
  }

  restAll() {
    this.isEditMode = false;
    this.editData = null;
    this.showForm = false;
    this.form.reset();
  }
}
