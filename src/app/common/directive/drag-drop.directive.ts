import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[dragDropZone]',
  standalone: true,
})
export class DropZoneDirective {
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropogation();
    console.log('drag over');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropogation();
    console.log('drag over');
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault();
    evt.stopPropogation();
    console.log('drag over');
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      console.log(`you dropped ${files.length} files.`);
      this.fileDropped.emit(files);
    }
  }
}
