import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { ToastrService } from 'ngx-toastr';
import { Subject, of } from 'rxjs';
import { MaketingSales } from '../marketing-sales.model';

export class adsDetails {
  title: string;
  adtext: string;
  id?: number;
}

export interface adsDetailsRes {}

@Injectable()
export class adsDetailsResFormAdaptor extends AbstractRequestFormAdaptor<
  adsDetails,
  adsDetailsRes
> {
  override name = 'manage-Ad-Text';
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<void>();

  override onRequest(formGroup: adsDetails) {
    this.formData$.next();
    // console.log('Channel-ad Managed Successfully', formGroup);
    // this.toastr.success('Channel-ad Managed Successfully');
    return of({});
  }
}
