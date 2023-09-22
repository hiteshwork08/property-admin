import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDailogComponent } from '@common/confirmation-dailog/confirmation-dailog.component';

@Component({
  selector: 'cancel-btn',
  standalone: true,
  imports: [ConfirmationDailogComponent, MatButtonModule],
  templateUrl: './cancel-btn.component.html',
  styleUrls: ['./cancel-btn.component.scss'],
})
export class CancelFormComponent {
  @Output() promptConfirmed: EventEmitter<boolean> = new EventEmitter();
  constructor(public dialog: MatDialog) {}
  cancelProperty() {
    const dialogRef = this.dialog.open(ConfirmationDailogComponent, {
      data: {
        message: 'Are you sure you want to cancel this property?',
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result) => this.promptConfirmed.emit(result));
  }
}
