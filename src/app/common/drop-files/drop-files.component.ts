import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DndDirective } from '@common/directive/dnd.directive';
import { FileListComponent } from './file-list/file-list.component';

@Component({
  selector: 'app-drop-files',
  standalone: true,
  imports: [CommonModule, DndDirective, FileListComponent],
  templateUrl: './drop-files.component.html',
  styleUrls: ['./drop-files.component.scss'],
})
export class DropFilesComponent {
  @Input() multiple = false;
  @Input() accept: string[] = [];
  @Input() elementRef: string = '';
  @Input() label: string = 'Upload file';
  @Output() onFileDropped = new EventEmitter<FileList | File>();
  @Output() resetControl = new EventEmitter<void>();

  documents: File[] = [];

  inteceptFileDrop(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      if (inputElement.files && inputElement.files.length > 0) {
        for (let i = 0; i < inputElement.files.length; i++) {
          this.documents.push(inputElement.files[i]);
        }
      }
      this.onFileDropped.next(
        this.multiple ? inputElement.files : inputElement.files[0]
      );
    }
  }

  removeItem(index: number) {
    this.documents.splice(index, 1);
    // this.onFileDropped.next(this.multi ? this.documents : this.documents[0]);
  }
}
