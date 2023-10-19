import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogContentComponent } from './confirm-dialog-content/confirm-dialog-content.component';
import { MatIconModule } from '@angular/material/icon';
import { ManageImagesComponent } from 'src/app/features/marketing-sales/manage-images/manage-images.component';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ManageImagesComponent,
    ConfirmDialogContentComponent,
    MatIconModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() message = '';
  @Input() dialogClass = '';
  @Output() promptConfirmed = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) {}

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogContentComponent, {
      data: { message: this.message },
    });

    dialogRef
      .afterClosed()
      .subscribe((result) => this.promptConfirmed.emit(result));
  }
}
