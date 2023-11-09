import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { FormGroup } from '@angular/forms';
import { SalesStatus } from '../../sales.model';

export interface ReceiveDocsFormData {
  buyerDoc: File | FileList;
}

export interface ReceiveDocsResponse {}

@Injectable()
export class ReceiveDocsFormAdaptor extends AbstractRequestFormAdaptor<
  ReceiveDocsFormData,
  ReceiveDocsResponse
> {
  override name = 'Received-Docs-Form-Buyer';
  private salesStatus = inject(SalesStatus);
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<ReceiveDocsFormData>();
  override onRequest(formGroup: ReceiveDocsFormData) {
    console.log('Form saved...', formGroup);
    this.toastr.success('Success!', 'Record was saved successfully');
    return of({});
  }
  override onSuccess(
    formData: ReceiveDocsFormData,
    res: ReceiveDocsResponse,
    formGroup: FormGroup<WrapFormControl<ReceiveDocsFormData>>
  ): void {
    this.formData$.next(formData);
  }
}
