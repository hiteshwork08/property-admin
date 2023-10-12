import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  SimpleChange,
  inject,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[readOnlyForm]',
  standalone: true,
})
export class ReadOnlyFormDirective {
  toastr = inject(ToastrService);

  @Input() messageToDisplayOnCLick: string | undefined = undefined;

  @Input() readOnlyForm: boolean = false;

  @HostListener('click', ['$event'])
  onClick(_) {
    if (this.readOnlyForm) {
      this.messageToDisplayOnCLick
        ? this.toastr.info(this.messageToDisplayOnCLick)
        : '';
    }
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  async ngOnChanges(changes: SimpleChange) {
    if (
      changes['readOnlyForm'] &&
      changes['readOnlyForm'].currentValue !==
        changes['readOnlyForm'].previousValue
    ) {
      this.readOnlyForm = changes['readOnlyForm'].currentValue;

      this.readOnlyForm
        ? await this.addReadOnlyContainer()
        : await this.removeReadOnlyContainer();
    }
    if (
      changes['messageToDisplayOnCLick'] &&
      changes['messageToDisplayOnCLick'].currentValue !==
        changes['messageToDisplayOnCLick'].previousValue
    ) {
      this.messageToDisplayOnCLick =
        changes['messageToDisplayOnCLick'].currentValue;
    }
  }

  private addReadOnlyContainer(): Promise<void> {
    return new Promise((resolve, _) => {
      // Create the child element with the class "absolute"
      const childElement = this.renderer.createElement('div');
      this.renderer.addClass(childElement, 'read-only-container');

      // Append the child element to the parent element
      this.renderer.appendChild(this.el.nativeElement, childElement);
      resolve();
    });
  }

  private removeReadOnlyContainer(): Promise<void> {
    return new Promise((resolve, _) => {
      // Remove the child element if it exists
      const childElement = this.el.nativeElement.querySelector(
        '.read-only-container'
      );

      if (childElement) {
        this.renderer.removeChild(this.el.nativeElement, childElement);
      }
      resolve();
    });
  }
}
