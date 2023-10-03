import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
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
  ],
  templateUrl: './payment-complete-form.component.html',
  styleUrls: ['./payment-complete-form.component.scss'],
  providers: [provideFormAdaptor(PaymentCompleteFormAdaptor, true)],
})
export class PaymentCompleteFormComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      note: [''],
    });
  }
}
