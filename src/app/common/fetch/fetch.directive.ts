import { Directive, inject, InjectionToken, Input, NgModule, OnDestroy, OnInit, Provider, TemplateRef, Type, ViewContainerRef } from "@angular/core";
import { catchError, EMPTY, Subject, tap } from "rxjs";

import { asserts } from "../../core/utils/assertion";
import { AbstractFetchAdaptor } from "./abstract-fetch.adaptor";

export const FETCH_ADAPTORS = new InjectionToken<AbstractFetchAdaptor<object, unknown>[]>("FETCH_ADAPTORS");

export function provideFetchAdaptor(provider: Type<AbstractFetchAdaptor<object, unknown>>, global = false): Provider[] | Provider {
  if (global) return [{ provide: FETCH_ADAPTORS, useExisting: provider, multi: true }, provider];
  return { provide: FETCH_ADAPTORS, useClass: provider, multi: true } as Provider;
}

@Directive({
  selector: "[appFetch]",
})
export class FetchDirective implements OnInit, OnDestroy {
  @Input() appFetch: string;
  @Input() set appFetchProps(val: object) {
    this._appFetchProps = val;
    // istanbul ignore next
    if (this.fetchAdaptor !== undefined) {
      this.fetch();
    }
  }
  get appFetchProps() {
    return this._appFetchProps;
  }
  @Input() appFetchLoading: TemplateRef<unknown>;
  @Input() appFetchError: TemplateRef<unknown>;

  private _appFetchProps: object;

  fetchAdaptor: AbstractFetchAdaptor<object, unknown> | undefined;

  private fetchAdaptors = inject(FETCH_ADAPTORS);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);

  private destroy = new Subject<void>();

  ngOnInit() {
    this.fetch();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.viewContainerRef.clear();
  }

  private fetch() {
    if (this.fetchAdaptor === undefined) {
      this.fetchAdaptor = this.fetchAdaptors.find((adaptor) => adaptor.name === this.appFetch);

      asserts(
        this.fetchAdaptor instanceof AbstractFetchAdaptor,
        `FetchAdaptor not found with name: ${this.appFetch}\n\nAvailable adaptors: \n${this.fetchAdaptors.map((adaptor) => adaptor.name).join("\n")}`
      );
    }

    if (this.appFetchLoading) {
      const viewRef = this.viewContainerRef.createEmbeddedView(this.appFetchLoading);
      viewRef.markForCheck();
    }

    this.fetchAdaptor
      ?.onRequest(this.appFetchProps)
      .pipe(
        catchError((err: unknown) => {
          if (this.appFetchError) {
            this.viewContainerRef.clear();
            const viewRef = this.viewContainerRef.createEmbeddedView(this.appFetchError, { $implicit: err });
            viewRef.markForCheck();

            this.fetchAdaptor!.onError?.(this.appFetchProps, err);
          }
          return EMPTY;
        }),
        tap((res) => {
          this.viewContainerRef.clear();
          const viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, { $implicit: res });
          viewRef.markForCheck();

          this.fetchAdaptor!.onSuccess?.(this.appFetchProps, res);
        })
      )
      .subscribe();
  }
}

@NgModule({
  declarations: [FetchDirective],
  exports: [FetchDirective],
})
export class FetchModule {}
