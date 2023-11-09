import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-lead-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './info-lead-modal.component.html',
  styleUrls: ['./info-lead-modal.component.scss'],
})
export class InfoLeadModalComponent {
  constructor(
    private dialogRef: MatDialogRef<InfoLeadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeAlert() {
    this.dialogRef.close();
  }
}
