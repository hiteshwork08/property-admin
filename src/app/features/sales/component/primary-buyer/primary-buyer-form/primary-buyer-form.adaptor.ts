import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { FormGroup } from '@angular/forms';
import { SALES_ENUM, SalesStatus } from '../../../sales.model';

export interface PrimaryBuyerFormData {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  companyName: string;
}
export interface PrimaryBuyerResponse {}

@Injectable()
export class PrimaryBuyerFormAdaptor extends AbstractRequestFormAdaptor<
  PrimaryBuyerFormData,
  PrimaryBuyerResponse
> {
  override name = 'Primary-Buyer';
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<PrimaryBuyerFormData>();
  override onRequest(formGroup: PrimaryBuyerFormData) {
    console.log('Form saved...', formGroup);
    this.toastr.success('Data added Successfully');
    return of({});
  }

  override onSuccess(
    formData: PrimaryBuyerFormData,
    res: PrimaryBuyerResponse,
    formGroup: FormGroup<WrapFormControl<PrimaryBuyerFormData>>
  ): void {
    this.formData$.next(formData);
  }
}
