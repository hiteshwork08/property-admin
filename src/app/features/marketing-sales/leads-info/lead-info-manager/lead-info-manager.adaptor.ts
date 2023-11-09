import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { ToastrService } from 'ngx-toastr';
import { Subject, of } from 'rxjs';

export class LeadDetails {
  adId: number;
  channel: string;
  propertyName: number;
  phoneNumber: number;
  email: string;
  firstName: string;
  lastName: string;
  dateAdded: Date;
  message: string;
}

export interface LeadResponse {}

@Injectable()
export class LeadInfoFormAdaptor extends AbstractRequestFormAdaptor<
  LeadDetails,
  LeadResponse
> {
  override name = 'lead-info-manager';
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<LeadDetails>();

  override onRequest(formGroup: LeadDetails) {
    this.toastr.success('leads added Successfully');
    return of({});
  }

  override onSuccess(
    formData: LeadDetails,
    res: LeadDetails,
    formGroup: FormGroup<WrapFormControl<LeadDetails>>
  ): void {
    this.formData$.next(formData);
  }
}
