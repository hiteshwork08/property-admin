import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentCompleteFormAdaptor } from './payment-complete-form.adaptor';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { MatButtonModule } from '@angular/material/button';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';

@Component({
  selector: 'app-payment-complete-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    MatInputModule,
    MatButtonModule,
    ReadOnlyFormDirective,
  ],
  templateUrl: './payment-complete-form.component.html',
  styleUrls: ['./payment-complete-form.component.scss'],
  providers: [provideFormAdaptor(PaymentCompleteFormAdaptor, true)],
})
export class PaymentCompleteFormComponent {
  @Input() readOnly = false;
  form = new FormGroup({
    note: new FormControl(''),
  });

  constructor() {}
}
