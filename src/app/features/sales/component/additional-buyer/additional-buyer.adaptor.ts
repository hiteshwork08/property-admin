import { Injectable } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';

export interface AdditonalBuyerFormtable {}

export interface AdditonalBuyerFormtableResponse {}

@Injectable()
export class AdditonalBuyertableFormAdaptor extends AbstractRequestFormAdaptor<
  AdditonalBuyerFormtable,
  AdditonalBuyerFormtableResponse
> {
  override name = 'Additional-Buyer';
  // private toastr = inject(ToastrService);
  readonly formData$ = new Subject<AdditonalBuyerFormtable>();

  override onRequest() {
    // this.toastr.success('leads added Successfully');
    return of({});
  }

  override onSuccess(formData: AdditonalBuyerFormtable): void {
    this.formData$.next(formData);
  }
}
