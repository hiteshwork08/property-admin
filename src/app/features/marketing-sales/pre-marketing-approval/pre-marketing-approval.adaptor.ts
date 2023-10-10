import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { ToastrService } from 'ngx-toastr';
import { Subject, of } from 'rxjs';
import { MaketingSales } from '../marketing-sales.model';

export interface PreMarketingApproval {
  comment: string;
}

export interface PreMarketingRes {}

@Injectable()
export class PreMarketingFormAdaptor extends AbstractRequestFormAdaptor<
  PreMarketingApproval,
  PreMarketingRes
> {
  override name = 'Pre-Marketing-Approval';
  private propertyIntakeModel = inject(MaketingSales);
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<PreMarketingApproval>();
  override onRequest(formGroup: PreMarketingApproval) {
    console.log('Marketing Approved Successfully', formGroup);
    this.toastr.success('Marketing Approved Successfully');
    return of({});
  }
}
