import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { FormGroup } from '@angular/forms';

export interface PrimaryBuyerData {}
export interface PrimaryBuyerResponse {}

@Injectable()
export class PrimaryBuyerAdaptor extends AbstractRequestFormAdaptor<
  PrimaryBuyerData,
  PrimaryBuyerResponse
> {
  override name = 'Primary-Buyer-table';
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<PrimaryBuyerData>();
  override onRequest(formGroup: PrimaryBuyerData) {
    console.log('Form saved...', formGroup);
    this.toastr.success('Data added Successfully');
    return of({});
  }

  override onSuccess(
    formData: PrimaryBuyerData,
    res: PrimaryBuyerResponse,
    formGroup: FormGroup<WrapFormControl<PrimaryBuyerData>>
  ): void {
    this.formData$.next(formData);
  }
}
