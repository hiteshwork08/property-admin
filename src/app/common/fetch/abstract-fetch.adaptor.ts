import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AbstractFetchAdaptor<Props extends object, Response> {
  abstract name: string;
  abstract onRequest(props: Props): Observable<Response>;
  onSuccess?(props: Props, res: Response): void;
  onError?(props: Props, errorRes: unknown): void;
}
