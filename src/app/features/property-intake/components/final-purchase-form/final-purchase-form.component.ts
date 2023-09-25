import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CancelFormComponent } from '@common/cancel-btn/cancel-btn.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import { FormHandlerModule, provideFormAdaptor } from '@common/form/form.directive';
import { FinalPurcahseAmountFormAdaptor } from './final-purchase-form.adaptor';
import { NgxMaskModule } from 'ngx-mask';

@Component({
  selector: 'app-final-purchase-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    FormErrorModule,
    FormHandlerModule,
    MatFormFieldModule,
    CommonModule,
    FetchModule,
    NgxMaskModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    CancelFormComponent,
  ],
  templateUrl: './final-purchase-form.component.html',
  styleUrls: ['./final-purchase-form.component.scss'],
  providers: [provideFormAdaptor(FinalPurcahseAmountFormAdaptor, true)],
})
export class FinalPurchaseFormComponent {
  verifiedLegalDescription = 'Your legal description goes here';

  form = new FormGroup({
    finalofferamount: new FormControl(),
    note: new FormControl<string>(undefined),
  });

  promptConfirmed(value) {
    console.log(value);
  }
}
