import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-leads-info',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
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
  selectedAdId = [
    {
      id: 'ID1',
      Channel: 'facebook',
      propertyName: 'Alabama-Barbour-12546',
    },
    {
      id: 'ID2',
      Channel: 'whatsapp',
      propertyName: 'Alaska-Bethel-12546',
    },
    {
      id: 'ID3',
      Channel: 'instagram',
      propertyName: 'Arizona-Cochise-12546',
    },
    {
      id: 'ID4',
      Channel: 'Arizona',
      propertyName: 'Alabama-Cochise-12546',
    },
    {
      id: 'ID5',
      Channel: 'Alaska',
      propertyName: 'Alabama-Anchorage-12546',
    },
  ];

  showForm = false;
  isModalOpen = false;

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
  ADIds: any = [];

  AdIds: string[] = ['ID1', 'ID2', 'ID3'];
  form: FormGroup = new FormGroup({
    adId: new FormControl<number>(null),
    channel: new FormControl<string>(null),
    propertyName: new FormControl<number | string>(null),
    phoneNumber: new FormControl<number>(null, [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
    ]),
    email: new FormControl<string | null>(null, Validators.email),
    firstName: new FormControl<string>(null, Validators.required),
    lastName: new FormControl<string>(null),
    dateAdded: new FormControl<Date>(new Date(), Validators.required),
    message: new FormControl<string>(null, Validators.required),
  });

  constructor(private toastr: ToastrService, private dialog: MatDialog) {}

  onSubmit() {
    if (this.form.valid) {
      const newItem = this.form.value;
      newItem.id = this.ADIds.length + 1;
      this.ADIds.push(newItem);
      this.ADIds = [...this.ADIds];
      this.restAll();
      this.recalculatePositions();
      this.toastr.success('Channel Ads added successfully.');
    } else {
      this.toastr.error('Please fill in all required fields.');
    }
  }
  private recalculatePositions() {
    for (let i = 0; i < this.ADIds.length; i++) {
      this.ADIds[i].id = i + 1;
    }
  }

  restAll() {
    this.showForm = false;
    this.form.reset();
  }

  onAdIdChange(selectedAdId: string) {
    const matchingData = this.selectedAdId.find(
      (data) => data.id === selectedAdId
    );
    if (matchingData) {
      this.form.patchValue({
        channel: matchingData.Channel,
        propertyName: matchingData.propertyName,
      });
    } else {
      this.form.patchValue({
        channel: null,
        propertyName: null,
      });
    }
  }

  openInfo() {
    this.isModalOpen = !this.isModalOpen;
    const dialogRef = this.dialog.open(LeadsInfoComponent, {
      width: '600px',
      height: '700px',
    });
  }
  closeModal() {}
}
