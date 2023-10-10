import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { PreMarketingFormAdaptor } from './pre-marketing-approval.adaptor';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';

@Component({
  selector: 'app-pre-marketing-approval',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
  ],
  templateUrl: './pre-marketing-approval.component.html',
  styleUrls: ['./pre-marketing-approval.component.scss'],
  providers: [provideFormAdaptor(PreMarketingFormAdaptor, true)],
})
export class PreMarketingApprovalComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      comment: [''],
    });
  }
}
