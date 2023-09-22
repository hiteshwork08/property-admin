import { Directive, EmbeddedViewRef, inject, Input, NgModule, OnDestroy, OnInit, TemplateRef, ViewContainerRef, ViewRef } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { merge, Subject, takeUntil } from "rxjs";

@Directive({
  selector: "[appFieldErrorsFor]",
})
export class FieldErrorsDirective implements OnInit, OnDestroy {
  @Input("appFieldErrorsFor") name: string;

  fieldErrors: FieldErrorDirective[] = [];

  private changes$ = new Subject<void>();

  private parent = inject(ControlContainer, { host: true, optional: true })!;

  get control() {
    return this.parent.control?.get(this.name);
  }

  private destroy$ = new Subject<void>();

  constructor() {
    if (!this.parent) {
      throw new Error("formGroup directive is missing on parent.");
    }
  }

  ngOnInit() {
    const control = this.control;
    if (control) {
      const methodsToPatch = ["markAsTouched", "markAllAsTouched", "markAsUntouched"] as const;
      methodsToPatch.forEach((method) => {
        const methodFn = control[method].bind(control);
        control[method] = (...args: Parameters<typeof methodFn>) => {
          methodFn(...args);
          this.changes$.next();
        };
      });

      merge(this.changes$, control.statusChanges, control.valueChanges)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.updateView());
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  updateView() {
    let showError = true;
    for (const field of this.fieldErrors) {
      if (field.error && showError) {
        field.update(true);
        showError = false;
      } else {
        field.update(false);
      }
    }
  }

  addFieldError(fieldError: FieldErrorDirective) {
    this.fieldErrors.push(fieldError);
  }

  removeFieldError(fieldError: FieldErrorDirective) {
    this.fieldErrors = this.fieldErrors.filter((f) => f !== fieldError);
  }
}

@Directive({
  selector: "[appFieldError]",
})
export class FieldErrorDirective implements OnInit, OnDestroy {
  fieldErrorsFor = inject(FieldErrorsDirective, { host: true, optional: true })!;

  viewContainerRef = inject(ViewContainerRef);
  templateRef = inject(TemplateRef);

  viewRef: ViewRef;
  viewCreated = false;
  viewShow = false;

  @Input("appFieldError") errorName: string;

  constructor() {
    if (!this.fieldErrorsFor) {
      throw new Error("appFieldErrorsFor directive is missing on parent.");
    }
    this.fieldErrorsFor.addFieldError(this);
  }

  ngOnInit() {
    this.fieldErrorsFor.updateView();
  }

  ngOnDestroy(): void {
    this.fieldErrorsFor.removeFieldError(this);
    this.viewContainerRef.clear();
  }

  update(show: boolean) {
    if (show) {
      if (!this.viewCreated) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, { $implicit: this.error });
        this.viewCreated = true;
        this.viewShow = true;
      } else if (!this.viewShow) {
        this.viewContainerRef.insert(this.viewRef!);
        this.viewShow = show;
      }

      if (this.viewShow) {
        (this.viewRef as EmbeddedViewRef<{ $implicit: unknown }>).context = { $implicit: this.error };
      }
    } else {
      this.viewContainerRef.detach();
      this.viewShow = show;
    }
  }

  get error() {
    return this.fieldErrorsFor.control?.touched && this.fieldErrorsFor.control?.getError(this.errorName);
  }
}

export const FORM_ERROR_DIRECTIVE = [FieldErrorsDirective, FieldErrorDirective] as const;

@NgModule({
  declarations: [...FORM_ERROR_DIRECTIVE],
  exports: [...FORM_ERROR_DIRECTIVE],
})
export class FormErrorModule {}
