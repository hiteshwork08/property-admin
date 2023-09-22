import { Directive, HostListener, inject, InjectionToken, Input, NgModule, OnDestroy, Provider, Type } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";
import { takeUntil } from "rxjs";

import { asserts } from "../../core/utils/assertion";
import { AbstractFormAdaptor } from "./abstract-form.adaptor";
import { AbstractRequestFormAdaptor } from "./abstract-request-form.adaptor";

export const FORM_ADAPTORS = new InjectionToken<AbstractFormAdaptor<unknown>[]>("FORM_ADAPTORS");

export function provideFormAdaptor(provider: Type<AbstractFormAdaptor<unknown>>, global = false): Provider[] | Provider {
  if (global) {
    return [{ provide: FORM_ADAPTORS, useExisting: provider, multi: true }, provider];
  }
  return { provide: FORM_ADAPTORS, useClass: provider, multi: true } as Provider;
}

@Directive({
  selector: "form[appForm]",
})
export class FormDirective implements OnDestroy {
  _appForm: string;

  @Input()
  set appForm(value: string) {
    this._appForm = value;
    this.formAdaptor = this.formAdaptors.find((formAdaptor) => formAdaptor.name === value);
  }
  get appForm() {
    return this._appForm;
  }

  @Input() formGroup: FormGroup;

  formAdaptor: AbstractFormAdaptor<object> | undefined;

  private formAdaptors = inject<AbstractFormAdaptor<unknown>[]>(FORM_ADAPTORS);
  private controlContainer = inject(ControlContainer, { host: true, self: true, optional: true });

  constructor() {
    asserts(this.controlContainer != null, "formGroup directive is missing on appForm host element");
  }

  ngOnDestroy(): void {
    this.formAdaptor?.destroy$.next();
  }

  @HostListener("ngSubmit")
  onSubmit() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) return;

    asserts(
      this.formAdaptor != null,
      `FormAdaptor not found with name: "${this.appForm}"\n\nAvailable adaptors: \n${this.formAdaptors.map((adaptor) => adaptor.name).join("\n")}`
    );

    if (this.formAdaptor instanceof AbstractRequestFormAdaptor) {
      this.formAdaptor.errors$.pipe(takeUntil(this.formAdaptor.destroy$)).subscribe((errors) => {
        if (!errors) {
          return this.formGroup.setErrors({ server: "Unknown error" });
        }

        if (errors.base) {
          return this.formGroup.setErrors({ server: errors.base });
        }

        Object.entries(errors).forEach(([key, value]) => {
          this.formGroup.get(key)?.setErrors({ server: value.toString() });
        });
      });
    }
    this.formAdaptor.onSubmit(this.formGroup);
  }
}

@NgModule({
  declarations: [FormDirective],
  exports: [FormDirective],
})
export class FormHandlerModule {}
