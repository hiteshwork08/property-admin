import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { FormGroup } from '@angular/forms';
import { SALES_ENUM, SalesStatus } from '../../sales.model';

export interface NoteDetailsFormData {
  noteDetails: string;
}
export interface NoteDetailsResponse {}

@Injectable()
export class NoteDetailsFormAdaptor extends AbstractRequestFormAdaptor<
  NoteDetailsFormData,
  NoteDetailsResponse
> {
  override name = 'Note-Details';
  private toastr = inject(ToastrService);
  private SalesStatus = inject(SalesStatus);
  readonly formData$ = new Subject<NoteDetailsFormData>();
  override onRequest(formGroup: NoteDetailsFormData) {
    this.SalesStatus.value = SALES_ENUM.CONFIRM_PAYMENT;
    console.log('Form saved...', formGroup);
    this.toastr.success('Data added Successfully');
    return of({});
  }

  override onSuccess(
    formData: NoteDetailsFormData,
    res: NoteDetailsResponse,
    formGroup: FormGroup<WrapFormControl<NoteDetailsFormData>>
  ): void {
    this.formData$.next(formData);
  }
}
