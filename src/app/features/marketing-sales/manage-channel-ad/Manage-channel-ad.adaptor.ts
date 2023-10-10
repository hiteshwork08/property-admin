import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { ToastrService } from 'ngx-toastr';
import { Subject, of } from 'rxjs';
import { MaketingSales } from '../marketing-sales.model';

export interface ChannelAds {
  channelId: string;
  channelAdId: string;
  id?: number;
}

export interface ChannelAdsRes {}

@Injectable()
export class ChannelAdsResFormAdaptor extends AbstractRequestFormAdaptor<
  ChannelAds,
  ChannelAdsRes
> {
  override name = 'manage-Channel-Ad';
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<void>();
  override onRequest(formGroup: ChannelAds) {
    this.formData$.next();
    // console.log('Channel-ad Managed Successfully', formGroup);
    // this.toastr.success('Channel-ad Managed Successfully');
    return of({});
  }
}
