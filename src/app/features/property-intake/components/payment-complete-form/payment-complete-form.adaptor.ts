import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { ToastrService } from 'ngx-toastr';
import { Subject, of } from 'rxjs';
import {
  PropertIntakeFormEnum,
  PropertyIntakeModel,
} from '../../property-intake.model';

export interface PaymentCompleteFormData {
  note: string;
}

export interface PaymentCompleteRes {}

@Injectable()
export class PaymentCompleteFormAdaptor extends AbstractRequestFormAdaptor<
  PaymentCompleteFormData,
  PaymentCompleteRes
> {
  override name = 'payment-complete-form';
  private propertyIntakeModel = inject(PropertyIntakeModel);
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<PaymentCompleteFormData>();
  override onRequest(formGroup: PaymentCompleteFormData) {
    // TODO: need to open after complete the
    // this.propertyIntakeModel.propertyIntakeStatus = PropertIntakeFormEnum.ProcessFrom;

    console.log('payment Successful', formGroup);
    this.toastr.success('Payment Successful');
    return of({});
  }
}
