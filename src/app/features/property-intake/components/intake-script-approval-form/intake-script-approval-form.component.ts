import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CancelFormComponent } from '@common/cancel-btn/cancel-btn.component';
import { SubmitIntakeScriptOfferFormData } from '../intake-script-form/intake-script-form.adaptor';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { IntakeScriptApprovalFormAdaptor } from './intake-script-approval-form.adaptor';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-intake-script-approval-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CancelFormComponent,
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './intake-script-approval-form.component.html',
  styleUrls: ['./intake-script-approval-form.component.scss'],
  providers: [provideFormAdaptor(IntakeScriptApprovalFormAdaptor, true)],
})
export class IntakeScriptApprovalFormComponent implements OnInit {
  @Input() propertyIntakeFormData: SubmitIntakeScriptOfferFormData;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      comment: [''],
    });
  }
  promptConfirmed(value) {
    console.log(value);
  }
}
