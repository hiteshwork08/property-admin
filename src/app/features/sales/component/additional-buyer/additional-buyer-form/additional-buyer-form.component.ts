import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from '@common/confirm-dialog/confirm-dialog.component';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import {
  AdditonalBuyerForm,
  AdditonalBuyerFormAdaptor,
} from './additional-buyer-form.adaptor';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';

@Component({
  selector: 'app-additional-buyer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    FormsModule,
    FormHandlerModule,
    FormErrorModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    ConfirmDialogComponent,
    MatIconModule,
    ReadOnlyFormDirective,
  ],
  templateUrl: './additional-buyer-form.component.html',
  styleUrls: ['./additional-buyer-form.component.scss'],
  providers: [provideFormAdaptor(AdditonalBuyerFormAdaptor, true)],
})
export class AdditionalBuyerFormComponent {
  @Input() readOnly = false;
  @Output() formData = new EventEmitter<AdditonalBuyerForm>();
  @Output() discardFormData = new EventEmitter<AdditonalBuyerForm>();
  form = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    address1: new FormControl<string>('', Validators.required),
    address2: new FormControl<string>(''),
    city: new FormControl<string>('', Validators.required),
    state: new FormControl<string>('', Validators.required),
    postalCode: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>(''),
    email: new FormControl<string>(''),
    companyName: new FormControl<string>(''),
  });

  constructor(private additonalBuyerFormAdaptor: AdditonalBuyerFormAdaptor) {
    this.additonalBuyerFormAdaptor.formData$.subscribe((data) =>
      this.formData.emit(data)
    );
  }

  discard() {
    this.discardFormData.emit();
    this.form.reset();
  }
}
