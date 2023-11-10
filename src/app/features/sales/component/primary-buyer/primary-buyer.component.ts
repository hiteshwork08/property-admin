import { Component, Input, inject } from '@angular/core';
import { PrimaryBuyerAdaptor } from './primary-buyer.adaptor';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import { PrimaryBuyerFormComponent } from './primary-buyer-form/primary-buyer-form.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '@common/confirm-dialog/confirm-dialog.component';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SALES_ENUM, SalesStatus } from '../../sales.model';
import { PrimaryBuyerFormData } from './primary-buyer-form/primary-buyer-form.adaptor';

@Component({
  selector: 'app-primary-buyer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    PrimaryBuyerFormComponent,
    MatIconModule,
    ConfirmDialogComponent,
    ReadOnlyFormDirective,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './primary-buyer.component.html',
  styleUrls: ['./primary-buyer.component.scss'],
  providers: [provideFormAdaptor(PrimaryBuyerAdaptor, true)],
})
export class PrimaryBuyerComponent {
  @Input() readOnly = false;
  showForm: boolean = true;
  dataSource: PrimaryBuyerFormData[] = [];
  displayedColumns: string[] = [
    'id',
    'fullName',
    'firstName',
    'lastName',
    'email',
    'companyName',
    'phoneNumber',
    'city',
    'state',
    'postalCode',
    'address1',
    'address2',
    'actions',
  ];
  private SalesStatus = inject(SalesStatus);
  onSubmitPrimaryBuyer() {
    this.SalesStatus.value = SALES_ENUM.ADDITIONAL_BUYER;
  }

  // Other component code

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
