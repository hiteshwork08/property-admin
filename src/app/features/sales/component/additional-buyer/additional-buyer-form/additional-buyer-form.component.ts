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
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';

import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';
import {
  AdditionalBuyerForm,
  AdditionalBuyerFormAdaptor,
} from './additional-buyer-form.adaptor';

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
  providers: [provideFormAdaptor(AdditionalBuyerFormAdaptor, true)],
})
export class AdditionalBuyerFormComponent {
  @Input() readOnly = false;
  @Output() formData = new EventEmitter<AdditionalBuyerForm>();
  @Output() discardFormData = new EventEmitter<AdditionalBuyerForm>();
  form = new FormGroup({
    fullName: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    companyName: new FormControl<string>('', Validators.required),
  });

  constructor(private additionalBuyerFormAdaptor: AdditionalBuyerFormAdaptor) {
    this.additionalBuyerFormAdaptor.formData$.subscribe((data) =>
      this.formData.emit(data)
    );
    this.form.get('firstName').valueChanges.subscribe(() => {
      this.updateFullName();
    });
    this.form.get('lastName').valueChanges.subscribe(() => {
      this.updateFullName();
    });
  }

  private updateFullName() {
    const firstName = this.form.get('firstName').value;
    const lastName = this.form.get('lastName').value;
    const fullName = `${firstName} ${lastName}`;
    this.form.get('fullName').setValue(fullName);
  }

  discard() {
    this.discardFormData.emit();
    this.form.reset();
  }
}
