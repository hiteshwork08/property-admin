import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { FormGroup } from '@angular/forms';
import { SALES_ENUM, SalesStatus } from '../../sales.model';

export interface RecordDeedFormData {
  buyerDoc: File | FileList;
}

export interface RecordDeedResponse {}

@Injectable()
export class RecordDeedFormAdaptor extends AbstractRequestFormAdaptor<
  RecordDeedFormData,
  RecordDeedResponse
> {
  override name = 'Record-Deed-Form';
  private salesStatus = inject(SalesStatus);
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<RecordDeedFormData>();
  override onRequest(formGroup: RecordDeedFormData) {
    this.salesStatus.value = SALES_ENUM.complete;

    console.log('Form saved...', formGroup);
    this.toastr.success('Success!', 'Record was saved successfully');
    return of({});
  }
  override onSuccess(
    formData: RecordDeedFormData,
    res: RecordDeedResponse,
    formGroup: FormGroup<WrapFormControl<RecordDeedFormData>>
  ): void {
    this.formData$.next(formData);
  }
}
