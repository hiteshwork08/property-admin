import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SALES_ENUM, SalesStatus } from '../../sales.model';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { FormGroup } from '@angular/forms';

export interface SaleDetailsInfoFormData {
  contractDate: string;
  saleType: string;
  cashPrice: string;
  monthlyNoteFee: string;
  interestRate: string;
  consideration: string;
  gracePeriodDays: string;
  lateFee: string;
  firstPaymentDate: string;
  monthlyTermsPrice: string;
  totalMonthlyPayment: string;
  numberOfMonths: string;
  monthlyTaxes: string;
}

export interface SaleDetailsInfoResponse {}

@Injectable()
export class SaleDetailsInfoFormAdaptor extends AbstractRequestFormAdaptor<
  SaleDetailsInfoFormData,
  SaleDetailsInfoResponse
> {
  override name = 'Sales-Details-Info';
  private SalesStatus = inject(SalesStatus);
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<SaleDetailsInfoFormData>();
  override onRequest(formGroup: SaleDetailsInfoFormData) {
    this.SalesStatus.value = SALES_ENUM.INVESTER_REVIEW;

    console.log('Form saved...', formGroup);
    this.toastr.success('Success!', 'Record was saved successfully');
    return of({});
  }
  override onSuccess(
    formData: SaleDetailsInfoFormData,
    res: SaleDetailsInfoResponse,
    formGroup: FormGroup<WrapFormControl<SaleDetailsInfoFormData>>
  ): void {
    this.formData$.next(formData);
  }
}
