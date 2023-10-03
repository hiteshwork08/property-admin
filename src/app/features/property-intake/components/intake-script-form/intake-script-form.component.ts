import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FetchModule,
  provideFetchAdaptor,
} from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { tap } from 'rxjs';
import {
  AllUtilities,
  SubmitIntakeScriptOfferFormData,
  SubmitIntakescriptOfferFormAdaptor,
  Utilities,
} from './intake-script-form.adaptor';
import { MatSelectModule } from '@angular/material/select';
import { Data } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-intake-script-form',
  templateUrl: './intake-script-form.component.html',
  styleUrls: ['./intake-script-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    MatChipsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  providers: [provideFormAdaptor(SubmitIntakescriptOfferFormAdaptor, true)],
})
export class IntakeScriptFormComponent {
  @Output() formData = new EventEmitter<SubmitIntakeScriptOfferFormData>();

  form = new FormGroup({
    ableToNotarize: new FormControl<boolean>(false),
    ableToNotarizeNotes: new FormControl<string>(null),
    haveDeedCopy: new FormControl<boolean>(false),
    canScanDeed: new FormControl<boolean>(false),
    yearsOwned: new FormControl<string>(null),
    hasPOA: new FormControl<boolean>(false),
    yearlyPOAFee: new FormControl<string>({ value: null, disabled: true }),
    hasHOA: new FormControl<boolean>(false),
    yearlyHOAFee: new FormControl<string>({ value: null, disabled: true }),
    backTaxesOwed: new FormControl<string>(null),
    hasLiens: new FormControl<boolean>(false),
    hasLiensNotes: new FormControl<string>({ value: null, disabled: true }),
    uniqueFeatures: new FormControl<string>(null),
    hasEasement: new FormControl<boolean>(false),
    hasEasementNotes: new FormControl<string>({ value: null, disabled: true }),
    improvements: new FormControl<string>(null),
    additionalProperties: new FormControl<string>(null),
    inTakeScriptNotes: new FormControl<string>(null),
    hasPictures: new FormControl<boolean>(false),
    hasSurvey: new FormControl<boolean>(false),
    utilities: new FormControl<Utilities[]>([]),
    Comment: new FormControl<string>(null),
  });

  constructor(
    private submitIntakescriptOfferFormAdaptor: SubmitIntakescriptOfferFormAdaptor
  ) {
    this.form.controls.ableToNotarize.valueChanges
      .pipe(
        tap((data) => {
          data
            ? this.form.controls.ableToNotarizeNotes.disable()
            : this.form.controls.ableToNotarizeNotes.enable();
        })
      )
      .subscribe();
    this.form.controls.hasPOA.valueChanges
      .pipe(
        tap((data) => {
          data
            ? this.form.controls.yearlyPOAFee.enable()
            : this.form.controls.yearlyPOAFee.disable();
        })
      )
      .subscribe();
    this.form.controls.hasHOA.valueChanges
      .pipe(
        tap((data) => {
          data
            ? this.form.controls.yearlyHOAFee.enable()
            : this.form.controls.yearlyHOAFee.disable();
        })
      )
      .subscribe();
    this.form.controls.hasLiens.valueChanges
      .pipe(
        tap((data) => {
          data
            ? this.form.controls.hasLiensNotes.enable()
            : this.form.controls.hasLiensNotes.disable();
        })
      )
      .subscribe();
    this.form.controls.hasEasement.valueChanges
      .pipe(
        tap((data) => {
          data
            ? this.form.controls.hasEasementNotes.enable()
            : this.form.controls.hasEasementNotes.disable();
        })
      )
      .subscribe();

    this.submitIntakescriptOfferFormAdaptor.formData$.subscribe((data) =>
      this.formData.emit(data)
    );
  }

  utilities: Utilities[] = AllUtilities;
}
