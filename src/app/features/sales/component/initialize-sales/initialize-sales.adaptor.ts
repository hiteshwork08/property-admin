import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { FormGroup } from '@angular/forms';
import { SALES_ENUM, SalesStatus } from '../../sales.model';

export interface InitalizesaleFormData {
  propertyName: string;
  lead: string;
  docfee: string;
  downpayment: string;
  initialAmount: string;
  buyertype: string;
  saletype: string;
}
export interface InitalizesaleResponse {}

@Injectable()
export class InitalizesaleFormAdaptor extends AbstractRequestFormAdaptor<
  InitalizesaleFormData,
  InitalizesaleResponse
> {
  override name = 'Intialize-Sales-Form';
  private toastr = inject(ToastrService);
  private salesStatus = inject(SalesStatus);
  readonly formData$ = new Subject<InitalizesaleFormData>();

  override onRequest(formGroup: InitalizesaleFormData) {
    this.salesStatus.value = SALES_ENUM.ADDITIONAL_BUYER;

    console.log('Form saved...', formGroup);
    this.toastr.success('Initalize sales added Successfully');
    return of({});
  }
  override onSuccess(
    formData: InitalizesaleFormData,
    res: InitalizesaleResponse,
    formGroup: FormGroup<WrapFormControl<InitalizesaleFormData>>
  ): void {
    this.formData$.next(formData);
  }
}
