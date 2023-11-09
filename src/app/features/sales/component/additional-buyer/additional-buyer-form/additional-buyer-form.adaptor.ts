import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { SalesStatus } from '../../../sales.model';

export interface AdditonalBuyerForm {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber?: string;
  email?: string;
  companyName?: string;
}

export interface AdditonalBuyerFormResponse {}

@Injectable()
export class AdditonalBuyerFormAdaptor extends AbstractRequestFormAdaptor<
  AdditonalBuyerForm,
  AdditonalBuyerFormResponse
> {
  override name = 'Additional-Buyer';

  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<AdditonalBuyerForm>();

  override onRequest(formGroup: AdditonalBuyerForm) {
    this.toastr.success('leads added Successfully');
    return of({});
  }

  override onSuccess(
    formData: AdditonalBuyerForm,
    res: AdditonalBuyerForm,
    formGroup: FormGroup<WrapFormControl<AdditonalBuyerForm>>
  ): void {
    this.formData$.next(formData);
  }
}
