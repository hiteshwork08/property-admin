import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";

export type WrapFormControl<FormData> = { [K in keyof FormData]: WrapFormGroup<FormData[K]> };

export type WrapFormGroup<FormData> = FormData extends Array<infer U>
  ? FormArray<WrapFormGroup<U>>
  : FormData extends object
  ? FormGroup<WrapFormControl<FormData>>
  : FormData extends string
  ? FormControl<string>
  : FormData extends number
  ? FormControl<number>
  : FormData extends boolean
  ? FormControl<boolean>
  : FormData extends undefined
  ? FormControl<undefined>
  : FormData extends null
  ? FormControl<null>
  : never;

@Injectable()
export abstract class AbstractFormAdaptor<FormData> {
  destroy$ = new Subject<void>();

  abstract name: string;
  abstract onSubmit(formGroup: WrapFormGroup<FormData>): void;
}
