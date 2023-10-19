import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-confirm-dialog-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './confirm-dialog-content.component.html',
  styleUrls: ['./confirm-dialog-content.component.scss'],
})
export class ConfirmDialogContentComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
