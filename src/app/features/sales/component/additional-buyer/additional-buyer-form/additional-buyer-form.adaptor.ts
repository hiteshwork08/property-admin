import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { SalesStatus } from '../../../sales.model';

export interface AdditionalBuyerForm {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
}

export interface AdditionalBuyerFormResponse {}

@Injectable()
export class AdditionalBuyerFormAdaptor extends AbstractRequestFormAdaptor<
  AdditionalBuyerForm,
  AdditionalBuyerFormResponse
> {
  override name = 'Additional-Buyer';

  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<AdditionalBuyerForm>();

  override onRequest(formGroup: AdditionalBuyerForm) {
    this.toastr.success('Data added Successfully');
    return of({});
  }

  override onSuccess(
    formData: AdditionalBuyerForm,
    res: AdditionalBuyerForm,
    formGroup: FormGroup<WrapFormControl<AdditionalBuyerForm>>
  ): void {
    this.formData$.next(formData);
  }
}
