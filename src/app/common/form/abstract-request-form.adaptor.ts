import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';

import { AbstractFormAdaptor, WrapFormGroup } from './abstract-form.adaptor';

export type ErrorsMap = {
  base: string;
  [key: string]: string | string[];
} | null;

@Injectable()
export abstract class AbstractRequestFormAdaptor<FormData, Res> extends AbstractFormAdaptor<FormData> {
  private _data = new Subject<Res>();
  data$ = this._data.asObservable();

  private _errors = new Subject<ErrorsMap>();
  errors$ = this._errors.asObservable();

  private _state = new BehaviorSubject<'idle' | 'pending' | 'success' | 'error'>('idle');
  state$ = this._state.asObservable();

  loading$ = this.state$.pipe(map((state) => state === 'pending'));

  override onSubmit(formGroup: WrapFormGroup<FormData>) {
    this._state.next('pending');

    const formData = formGroup.value as FormData;

    const req$ = this.onRequest(formData, formGroup);
    req$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this._state.next('success');
        this._state.next('idle');
        this._data.next(res);
        this.onSuccess?.(formData, res, formGroup);
      },
      error: (err: unknown) => {
        this._state.next('error');
        if (err instanceof HttpErrorResponse) {
          const errors = this.onMapError?.(formData, err) ?? err.error?.errors;
          this._errors.next(errors);
        }
        this.onError?.(formData, err, formGroup);
      },
    });
  }

  abstract onRequest(formData: FormData, formGroup: WrapFormGroup<FormData>): Observable<Res>;

  onSuccess?(formData: FormData, res: Res, formGroup: WrapFormGroup<FormData>): void;
  onError?(formData: FormData, errorRes: unknown, formGroup: WrapFormGroup<FormData>): void;
  onMapError?(formData: FormData, errorRes: HttpErrorResponse): ErrorsMap;
}
