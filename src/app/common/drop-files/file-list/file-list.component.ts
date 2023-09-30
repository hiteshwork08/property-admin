import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent {
  @Input() documents: File[] = [];
  @Output() resetControl = new EventEmitter<void>();
  @Output() removeItem = new EventEmitter<number>();
}
