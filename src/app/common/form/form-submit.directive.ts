import { Directive, ElementRef, EventEmitter, inject, Input, NgModule, OnDestroy, OnInit, Output, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appFormSubmit]",
})
export class FormSubmitDirective implements OnInit, OnDestroy {
  @Input("appFormSubmit") formEl: HTMLFormElement;
  @Input() submitOn = "click";

  @Output() beforeSubmit = new EventEmitter<Event>();

  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer = inject(Renderer2);
  private unListen: ReturnType<Renderer2["listen"]>;

  ngOnInit() {
    this.unListen = this.renderer.listen(this.elementRef.nativeElement, this.submitOn, this.submit);
  }

  submit = (e: Event) => {
    this.beforeSubmit.emit(e);
    if (e.defaultPrevented) return;

    this.formEl.dispatchEvent(new Event("submit"));
  };

  ngOnDestroy() {
    this.unListen();
  }
}

@NgModule({
  declarations: [FormSubmitDirective],
  exports: [FormSubmitDirective],
})
export class FormSubmitModule {}
