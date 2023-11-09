import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { InfoLeadModalComponent } from '../info-lead-modal/info-lead-modal.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import {
  LeadInfoFormAdaptor,
  LeadDetails,
  LeadResponse,
} from './lead-info-manager.adaptor';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { FormErrorModule } from '@common/form/field-error.directive';

@Component({
  selector: 'app-lead-info-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    FormHandlerModule,
    FormErrorModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule,
  ],
  templateUrl: './lead-info-manager.component.html',
  styleUrls: ['./lead-info-manager.component.scss'],
  providers: [provideFormAdaptor(LeadInfoFormAdaptor, true)],
})
export class LeadInfoManagerComponent {
  @Output() formData = new EventEmitter<LeadDetails>();
  @Output() discardFormData = new EventEmitter<LeadDetails>();
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

  constructor(private leadInfoFormAdaptor: LeadInfoFormAdaptor) {
    this.leadInfoFormAdaptor.formData$.subscribe((data) =>
      this.formData.emit(data)
    );
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

  discard() {
    this.discardFormData.emit();
    this.form.reset();
  }
}
