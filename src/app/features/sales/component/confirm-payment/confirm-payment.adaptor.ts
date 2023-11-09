import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { FormGroup } from '@angular/forms';
import { SALES_ENUM, SalesStatus } from '../../sales.model';

export interface ConfirmPaymentFormData {
  propertyName: string;
  lead: string;
  docfee: string;
  downpayment: string;
  initialAmount: string;
  buyertype: string;
  saletype: string;
}
export interface ConfirmPaymentResponse {}

@Injectable()
export class ConfirmPaymentFormAdaptor extends AbstractRequestFormAdaptor<
  ConfirmPaymentFormData,
  ConfirmPaymentResponse
> {
  override name = 'Confirm-Payment-Form';
  private toastr = inject(ToastrService);
  private SalesStatus = inject(SalesStatus);
  readonly formData$ = new Subject<ConfirmPaymentFormData>();
  override onRequest(formGroup: ConfirmPaymentFormData) {
    this.SalesStatus.value = SALES_ENUM.RECORD_DEED;
    console.log('Form saved...', formGroup);
    this.toastr.success('Initalize sales added Successfully');
    return of({});
  }

  override onSuccess(formData: ConfirmPaymentFormData): void {
    this.formData$.next(formData);
  }
}
