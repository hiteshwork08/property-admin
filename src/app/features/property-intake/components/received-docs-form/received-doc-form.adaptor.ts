import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { ToastrService } from 'ngx-toastr';
import { Subject, of } from 'rxjs';
import {
  PropertIntakeFormEnum,
  PropertyIntakeModel,
} from '../../property-intake.model';
import { FormGroup } from '@angular/forms';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';

export interface ReceivedDocsFormData {
  deedDocument: File | FileList;
  salesAgreementDocument: File | FileList;
  notes: string;
}

export interface ReceivedDocsRes {}

@Injectable()
export class ReceivedDocsFormAdaptor extends AbstractRequestFormAdaptor<
  ReceivedDocsFormData,
  ReceivedDocsRes
> {
  override name = 'received-doc-form';
  private propertyIntakeModel = inject(PropertyIntakeModel);
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<ReceivedDocsFormData>();
  override onRequest(formGroup: ReceivedDocsFormData) {
    this.propertyIntakeModel.propertyIntakeStatus =
      PropertIntakeFormEnum.RecordDeed;

    console.log('Form saved...', formGroup);
    this.toastr.success('Success!', 'Completed SucessFully');
    return of({});
  }

  override onSuccess(
    formData: ReceivedDocsFormData,
    res: ReceivedDocsRes,
    formGroup: FormGroup<WrapFormControl<ReceivedDocsFormData>>
  ): void {
    this.formData$.next(formData);
  }
}
