import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { ConfirmPaymentFormAdaptor } from './confirm-payment.adaptor';
import { SalesModel } from '../../sales.model';
import { distinctUntilChanged } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-confirm-payment',
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
    MatSlideToggleModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    ReadOnlyFormDirective,
  ],
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss'],
  providers: [provideFormAdaptor(ConfirmPaymentFormAdaptor, true)],
})
export class ConfirmPaymentComponent {
  @Input() readOnly = false;
  form = new FormGroup({
    note: new FormControl(''),
    saleType: new FormControl(''),
    paymentConfirm: new FormControl(false),
    docUploadVerified: new FormControl(false),
  });

  get saleType() {
    return this.form.get('saleType');
  }

  constructor(private salesModel: SalesModel) {
    this.salesModel.saleType
      .pipe(distinctUntilChanged())
      .subscribe((value: string) =>
        this.form.controls.saleType.setValue(value)
      );
  }
}
