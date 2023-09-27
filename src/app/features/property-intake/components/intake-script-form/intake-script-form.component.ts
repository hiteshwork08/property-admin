import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    yearlyPOAFee: new FormControl<string>(null),
    hasHOA: new FormControl<boolean>(false),
    yearlyHOAFee: new FormControl<string>(null),
    backTaxesOwed: new FormControl<string>(null),
    hasLiens: new FormControl<boolean>(false),
    hasLiensNotes: new FormControl<string>(null),
    uniqueFeatures: new FormControl<string>(null),
    hasEasement: new FormControl<boolean>(false),
    hasEasementNotes: new FormControl<string>(null),
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
            ? this.form.controls.yearlyPOAFee.disable()
            : this.form.controls.yearlyPOAFee.enable();
        })
      )
      .subscribe();
    this.form.controls.hasHOA.valueChanges
      .pipe(
        tap((data) => {
          data
            ? this.form.controls.yearlyHOAFee.disable()
            : this.form.controls.yearlyHOAFee.enable();
        })
      )
      .subscribe();
    this.form.controls.hasLiens.valueChanges
      .pipe(
        tap((data) => {
          data
            ? this.form.controls.hasLiensNotes.disable()
            : this.form.controls.hasLiensNotes.enable();
        })
      )
      .subscribe();
    this.form.controls.hasEasement.valueChanges
      .pipe(
        tap((data) => {
          data
            ? this.form.controls.hasEasementNotes.disable()
            : this.form.controls.hasEasementNotes.enable();
        })
      )
      .subscribe();

    this.submitIntakescriptOfferFormAdaptor.formData$.subscribe((data) =>
      this.formData.emit(data)
    );
  }

  utilities: Utilities[] = AllUtilities;
}
