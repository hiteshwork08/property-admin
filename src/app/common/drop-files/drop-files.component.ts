import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DropZoneDirective } from '@common/directive/drag-drop.directive';
import { FileListComponent } from './file-list/file-list.component';

@Component({
  selector: 'app-drop-files',
  standalone: true,
  imports: [CommonModule, DropZoneDirective, FileListComponent],
  templateUrl: './drop-files.component.html',
  styleUrls: ['./drop-files.component.scss'],
})
export class DropFilesComponent implements OnChanges {
  @Input() multiple = false;
  @Input() accept: string = '';
  @Input() elementRef: string = '';
  @Input() label: string = 'Upload file';
  @Output() onFileDropped = new EventEmitter<FileList | File>();
  @Output() resetControl = new EventEmitter<void>();

  @Input() existingDocuments: File | FileList = undefined;
  documents: File[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes['existingDocuments'] &&
      changes['existingDocuments']['currentValue']
    ) {
      this.existingDocuments = changes['existingDocuments']['currentValue'];
      this.existingDocuments instanceof File
        ? this.documents.push(this.existingDocuments)
        : this.setFiles(this.existingDocuments);
    }
  }
  inteceptFileDrop(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onFileDropped.next(
      this.multiple ? inputElement.files : inputElement.files[0]
    );
  }

  setFiles(inputElement: FileList) {
    if (inputElement.length > 0) {
      for (let i = 0; i < inputElement.length; i++) {
        this.documents.push(inputElement[i]);
      }
    }
  }

  removeItem(index: number) {
    this.documents.splice(index, 1);
    //TODO: Fix issue to also update the form controls
    // this.onFileDropped.next(this.multi ? this.documents : this.documents[0]);
  }
}
