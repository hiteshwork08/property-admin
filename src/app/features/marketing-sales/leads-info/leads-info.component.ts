import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskModule } from 'ngx-mask';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { InfoLeadModalComponent } from './info-lead-modal/info-lead-modal.component';
import { LeadInfoManagerComponent } from './lead-info-manager/lead-info-manager.component';
import { LeadDetails } from './lead-info-manager/lead-info-manager.adaptor';

@Component({
  selector: 'app-leads-info',
  standalone: true,
  imports: [
    CommonModule,
    LeadInfoManagerComponent,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule,
    MatChipsModule,
  ],
  templateUrl: './leads-info.component.html',
  styleUrls: ['./leads-info.component.scss'],
})
export class LeadsInfoComponent {
  showForm = false;
  displayedColumns: string[] = [
    'adId',
    'channel',
    'propertyName',
    'firstName',
    'lastName',
    'phoneNumber',
    'email',
    'dateAdded',
    'actions',
  ];
  dataSource: LeadDetails[] = [];
  constructor(private dialog: MatDialog) {}

  fetchFormData(data) {
    this.showForm = false;
    this.dataSource.push(data);
    this.dataSource = [...this.dataSource];
  }

  openInfo(data) {
    this.dialog.open(InfoLeadModalComponent, {
      width: '400px',
      height: 'auto',
      data,
    });
  }

  discardFormData() {
    this.showForm = false;
  }
}
