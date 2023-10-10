import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { ToastrService } from 'ngx-toastr';
import { Subject, of } from 'rxjs';

export class Image {
  ImageDescription: string;
  ImageFile: FileList;
  id?: number;
}

export interface ImageRes {}

@Injectable()
export class ImageFormAdaptor extends AbstractRequestFormAdaptor<
  Image,
  ImageRes
> {
  override name = 'manage-images';
  private toastr = inject(ToastrService);
  readonly imageData$ = new Subject<void>();

  override onRequest(formGroup: Image) {
    this.imageData$.next();
    // this.toastr.success('Images Managed Successfully');
    return of({});
  }
}
