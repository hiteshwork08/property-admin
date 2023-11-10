import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import {
  PrimaryBuyerFormAdaptor,
  PrimaryBuyerFormData,
} from './primary-buyer-form.adaptor';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';

@Component({
  selector: 'app-primary-buyer-form',
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
    ReadOnlyFormDirective,
    MatButtonModule,
  ],
  templateUrl: './primary-buyer-form.component.html',
  styleUrls: ['./primary-buyer-form.component.scss'],
  providers: [provideFormAdaptor(PrimaryBuyerFormAdaptor, true)],
})
export class PrimaryBuyerFormComponent {
  @Input() readOnly = false;
  @Output() formData = new EventEmitter<PrimaryBuyerFormData>();
  @Output() discardFormData = new EventEmitter<PrimaryBuyerFormData>();
  form = new FormGroup({
    fullName: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    address1: new FormControl<string>('', Validators.required),
    address2: new FormControl<string>(''),
    city: new FormControl<string>('', Validators.required),
    state: new FormControl<string>('', Validators.required),
    postalCode: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    companyName: new FormControl<string>('', Validators.required),
  });

  constructor(private primaryBuyerFormAdaptor: PrimaryBuyerFormAdaptor) {
    this.primaryBuyerFormAdaptor.formData$.subscribe((data) =>
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
