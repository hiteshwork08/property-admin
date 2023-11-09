import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { FormGroup } from '@angular/forms';
import { SalesStatus } from '../../sales.model';

export interface GenerateDocsFormData {
  propertyName: string;
}
export interface GenerateDocsResponse {}

@Injectable()
export class GenerateDocsFormAdaptor extends AbstractRequestFormAdaptor<
  GenerateDocsFormData,
  GenerateDocsResponse
> {
  override name = 'Generate-Docs-Form';
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<GenerateDocsFormData>();

  override onRequest(formGroup: GenerateDocsFormData) {
    console.log('Form saved...', formGroup);
    this.toastr.success('Document added Successfully');
    return of({});
  }

  override onSuccess(
    formData: GenerateDocsFormData,
    res: GenerateDocsResponse,
    formGroup: FormGroup<WrapFormControl<GenerateDocsFormData>>
  ): void {
    this.formData$.next(formData);
  }
}
