import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import {
  SaleDetailsInfoFormAdaptor,
  SaleDetailsInfoFormData,
} from './sales-details-info.adaptor';
import { SearchFilterPipe } from '@core/pipes/search-filter.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';
import { SalesModel } from '../../sales.model';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-sales-details-info',
  standalone: true,
  imports: [
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    CommonModule,
    SearchFilterPipe,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    NgxMaskModule,
    MatButtonModule,
    MatRadioModule,
    ReadOnlyFormDirective,
  ],
  templateUrl: './sales-details-info.component.html',
  styleUrls: ['./sales-details-info.component.scss'],
  providers: [provideFormAdaptor(SaleDetailsInfoFormAdaptor, true)],
})
export class SalesDetailsInfoComponent implements OnChanges {
  @Output() formData = new EventEmitter<SaleDetailsInfoFormData>();
  @Input() salesDetailsFormData: SaleDetailsInfoFormData;

  @Input() readOnly = false;
  termsFormControls = [
    'monthlyNoteFee',
    'interestRate',
    'consideration',
    'gracePeriodDays',
    'lateFee',
    'firstPaymentDate',
    'monthlyTermsPrice',
    'totalMonthlyPayment',
    'numberOfMonths',
    'monthlyTaxes',
  ];
  form = new FormGroup({
    contractDate: new FormControl<string>('', Validators.required),
    saleType: new FormControl<string>(''),
    cashPrice: new FormControl<string>('', Validators.required),
    monthlyNoteFee: new FormControl<string>('', Validators.required),
    interestRate: new FormControl<string>('', Validators.required),
    consideration: new FormControl<string>('', Validators.required),
    gracePeriodDays: new FormControl<string>('', Validators.required),
    lateFee: new FormControl<string>('', Validators.required),
    firstPaymentDate: new FormControl<string>('', Validators.required),
    monthlyTermsPrice: new FormControl<string>('', Validators.required),
    totalMonthlyPayment: new FormControl<string>(
      { value: '', disabled: true },
      Validators.required
    ), // Set as 'disabled'
    numberOfMonths: new FormControl<string>('', Validators.required),
    monthlyTaxes: new FormControl<string>('', Validators.required),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes['salesDetailsFormData'] &&
      changes['salesDetailsFormData']['currentValue']
    ) {
      this.salesDetailsFormData =
        changes['salesDetailsFormData']['currentValue'];
      this.form.patchValue(this.salesDetailsFormData);
    }
  }

  constructor(
    private saleDetailsInfoFormAdaptor: SaleDetailsInfoFormAdaptor,
    private salesModel: SalesModel
  ) {
    this.saleDetailsInfoFormAdaptor.formData$.subscribe((data) =>
      this.formData.emit(data)
    );

    this.salesModel.saleType
      .pipe(distinctUntilChanged())
      .subscribe((value: string) =>
        this.form.controls.saleType.setValue(value)
      );

    this.form.get('saleType').valueChanges.subscribe((saleType) => {
      if (saleType === 'cash') {
        this.form.controls.cashPrice.setValidators(Validators.required);
        this.termsFormControls.forEach((control) => {
          this.form.get(control).clearValidators();
          this.form.get(control).updateValueAndValidity();
        });
      } else {
        this.form.controls.cashPrice.clearValidators();
        this.termsFormControls.forEach((control) => {
          this.form.get(control).setValidators(Validators.required);
          this.form.get(control).updateValueAndValidity();
        });
      }
      this.form.controls.cashPrice.updateValueAndValidity();
    });
  }
}
