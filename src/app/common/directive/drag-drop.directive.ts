import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dragDropZone]',
  standalone: true,
})
export class DropZoneDirective {
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
