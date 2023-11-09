import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { FormGroup } from '@angular/forms';
import { SALES_ENUM, SalesStatus } from '../../sales.model';

export interface InvestorReviewFormData {
  propertyName: string;
  lead: string;
  docfee: string;
  downpayment: string;
  initialAmount: string;
  buyertype: string;
  saletype: string;
}
export interface InvestorReviewResponse {}

@Injectable()
export class InvestorReviewFormAdaptor extends AbstractRequestFormAdaptor<
  InvestorReviewFormData,
  InvestorReviewResponse
> {
  override name = 'Investor-Review-Form';
  private toastr = inject(ToastrService);
  private SalesStatus = inject(SalesStatus);
  readonly formData$ = new Subject<InvestorReviewFormData>();
  override onRequest(formGroup: InvestorReviewFormData) {
    this.SalesStatus.value = SALES_ENUM.RECEIVED_DOC;
    console.log('Form saved...', formGroup);
    this.toastr.success('Invester reviewed added Successfully');
    return of({});
  }

  override onSuccess(
    formData: InvestorReviewFormData,
    res: InvestorReviewResponse,
    formGroup: FormGroup<WrapFormControl<InvestorReviewFormData>>
  ): void {
    this.formData$.next(formData);
  }
}
