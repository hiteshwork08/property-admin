import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorModule } from '@common/form/field-error.directive';
import { FormHandlerModule } from '@common/form/form.directive';
import { AdditonalBuyerForm } from './additional-buyer-form/additional-buyer-form.adaptor';
import { ConfirmDialogComponent } from '@common/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AdditionalBuyerFormComponent } from './additional-buyer-form/additional-buyer-form.component';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';

@Component({
  selector: 'app-additional-buyer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    FormsModule,
    FormHandlerModule,
    FormErrorModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    ConfirmDialogComponent,
    MatIconModule,
    DropFilesComponent,
    ReadOnlyFormDirective,
    AdditionalBuyerFormComponent,
  ],
  templateUrl: './additional-buyer.component.html',
  styleUrls: ['./additional-buyer.component.scss'],
})
export class AdditionalBuyerComponent {
  @Input() readOnly = false;
  showForm = false;
  dataSource: AdditonalBuyerForm[] = [];
  displayedColumns: string[] = [
    'id',
    'fullName',
    'firstName',
    'lastName',
    'address1',
    'address2',
    'city',
    'state',
    'postalCode',
    'phoneNumber',
    'email',
    'companyName',
    'actions',
  ];

  // constructor(
  //   private toastr: ToastrService,
  //   private additonalBuyerFormAdaptor: AdditonalBuyerFormAdaptor
  // ) {
  //   this.additonalBuyerFormAdaptor.formData$.subscribe(() => {
  //     if (this.editData) {
  //       this.onUpdate();
  //     } else {
  //       this.addItem();
  //     }
  //   });
  // }
  // openEditDialog(row: AdditonalBuyer) {
  //   this.isEditMode = true;
  //   this.editData = { ...row };
  //   this.showForm = true;
  //   this.form.patchValue(this.editData);
  // }

  // ngOnInit(): void {}

  // deleteItem(isConfirm: boolean, itemToDelete: AdditonalBuyer) {
  //   if (!isConfirm) return;
  //   const index = this.dataSource.findIndex(
  //     (item) => item.id === itemToDelete.id
  //   );
  //   if (index !== -1) {
  //     this.dataSource.splice(index, 1);
  //     this.dataSource = [...this.dataSource];
  //     this.toastr.success('Chaneel Ads deleted successfully.');
  //   }
  // }

  // addItem() {
  //   const newItem = this.form.value;
  //   this.dataSource.push(newItem);
  //   this.dataSource = [...this.dataSource];
  //   this.restAll();
  //   this.toastr.success('Chaneel Ads successfully.');
  // }

  // onUpdate() {
  //   if (this.form.valid) {
  //     const formData = this.form.value;
  //     const index = this.dataSource.findIndex(
  //       (item) => item.id === formData.id
  //     );
  //     if (index !== -1) {
  //       this.dataSource[index] = formData;
  //     }
  //     this.dataSource = [...this.dataSource];
  //     this.restAll();
  //     this.toastr.success('Chaneel Ads updated successfully.');
  //   }
  // }

  fetchFormData(data) {
    this.showForm = false;
    this.dataSource.push(data);
    this.dataSource = [...this.dataSource];
  }

  discardFormData() {
    this.showForm = false;
  }
}
