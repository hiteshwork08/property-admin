import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DropFilesComponent } from '@common/drop-files/drop-files.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddManageDataComponent } from './add-manage-data/add-manage-data.component';
import { MatButtonModule } from '@angular/material/button';
import { LG_DIALOG_CONFIGS } from '@common/open-modal/dialog-config';

@Component({
  selector: 'app-manage-images',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DropFilesComponent,
    MatDialogModule,
    AddManageDataComponent,
  ],
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.scss'],
})
export class ManageImagesComponent {
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogConfig = { ...LG_DIALOG_CONFIGS };
    const dialogRef = this.dialog.open(AddManageDataComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
