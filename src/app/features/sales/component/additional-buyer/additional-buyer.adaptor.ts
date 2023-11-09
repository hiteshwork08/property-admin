import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { SALES_ENUM, SalesStatus } from '../../sales.model';

export interface AdditonalBuyerFormtable {}

export interface AdditonalBuyerFormtableResponse {}

@Injectable()
export class AdditonalBuyertableFormAdaptor extends AbstractRequestFormAdaptor<
  AdditonalBuyerFormtable,
  AdditonalBuyerFormtableResponse
> {
  override name = 'Additional-Buyer';
  private salesStatus = inject(SalesStatus);
  // private toastr = inject(ToastrService);
  readonly formData$ = new Subject<AdditonalBuyerFormtable>();

  override onRequest() {
    this.salesStatus.value = SALES_ENUM.SALES_DETAILS_INFO;
    // this.toastr.success('leads added Successfully');
    return of({});
  }

  override onSuccess(formData: AdditonalBuyerFormtable): void {
    this.formData$.next(formData);
  }
}
