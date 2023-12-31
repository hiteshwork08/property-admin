import { Injectable, inject } from '@angular/core';
import {
  PropertIntakeFormEnum,
  PropertyIntakeModel,
} from '../../property-intake.model';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';

export interface RecordDeedFormData {
  deedDocument: File | FileList;
}

export interface RecordDeedTitle {}

@Injectable()
export class RecordDeedFormAdaptor extends AbstractRequestFormAdaptor<
  RecordDeedFormData,
  RecordDeedTitle
> {
  override name = 'record-deed-form';
  private propertyIntakeModel = inject(PropertyIntakeModel);
  private toastr = inject(ToastrService);
  override onRequest(formGroup: RecordDeedFormData) {
    this.propertyIntakeModel.propertyIntakeStatus =
      PropertIntakeFormEnum.PaymentComplete;

    console.log('Form saved...', formGroup);
    this.toastr.success('Success!', 'Record was saved successfully');
    return of({});
  }
}
