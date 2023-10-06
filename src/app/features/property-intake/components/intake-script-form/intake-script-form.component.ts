import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
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
  IntakeScriptFormControlStateType1,
  IntakeScriptFormControlStateType2,
  IntakeScriptFormControlStates,
  SubmitIntakeScriptOfferFormData,
  SubmitIntakescriptOfferFormAdaptor,
  Utilities,
} from './intake-script-form.adaptor';
import { MatSelectModule } from '@angular/material/select';
import { Data } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-intake-script-form',
  templateUrl: './intake-script-form.component.html',
  styleUrls: ['./intake-script-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
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
    MatRadioModule,
  ],
  providers: [provideFormAdaptor(SubmitIntakescriptOfferFormAdaptor, true)],
})
export class IntakeScriptFormComponent {
  @Output() formData = new EventEmitter<SubmitIntakeScriptOfferFormData>();

  IntakeScriptFormControlStates = IntakeScriptFormControlStates;

  form = new FormGroup({
    ableToNotarize: new FormControl<IntakeScriptFormControlStateType1>(null),
    ableToNotarizeNotes: new FormControl<string>(null),
    haveDeedCopy: new FormControl<IntakeScriptFormControlStateType1>(null),
    canScanDeed: new FormControl<IntakeScriptFormControlStateType1>(null),
    yearsOwned: new FormControl<string>(null),
    hasPOA: new FormControl<IntakeScriptFormControlStateType2>(null),
    yearlyPOAFee: new FormControl<string>({ value: null, disabled: true }),
    hasHOA: new FormControl<IntakeScriptFormControlStateType2>(null),
    yearlyHOAFee: new FormControl<string>({ value: null, disabled: true }),
    backTaxesOwed: new FormControl<string>(null),
    hasLiens: new FormControl<IntakeScriptFormControlStateType2>(null),
    hasLiensNotes: new FormControl<string>({ value: null, disabled: true }),
    uniqueFeatures: new FormControl<string[]>([]),
    hasEasement: new FormControl<IntakeScriptFormControlStateType2>(null),
    hasEasementNotes: new FormControl<string>({ value: null, disabled: true }),
    improvements: new FormControl<string[]>([]),
    additionalProperties: new FormControl<string[]>([]),
    inTakeScriptNotes: new FormControl<string>(null),
    hasPictures: new FormControl<IntakeScriptFormControlStateType1>(null),
    hasSurvey: new FormControl<IntakeScriptFormControlStateType1>(null),
    utilities: new FormControl<Utilities[]>([]),
    Comment: new FormControl<string>(null),
  });
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private submitIntakescriptOfferFormAdaptor: SubmitIntakescriptOfferFormAdaptor
  ) {
    this.form.controls.ableToNotarize.valueChanges
      .pipe(
        tap((data) => {
          this.form.controls.ableToNotarizeNotes.reset();
          data === IntakeScriptFormControlStates.No
            ? this.form.controls.ableToNotarizeNotes.disable()
            : this.form.controls.ableToNotarizeNotes.enable();
        })
      )
      .subscribe();
    this.form.controls.hasPOA.valueChanges
      .pipe(
        tap((data) => {
          data === IntakeScriptFormControlStates.Yes ||
          IntakeScriptFormControlStates.Not_sure
            ? this.form.controls.yearlyPOAFee.enable()
            : this.form.controls.yearlyPOAFee.disable();
        })
      )
      .subscribe();
    this.form.controls.hasHOA.valueChanges
      .pipe(
        tap((data) => {
          data === IntakeScriptFormControlStates.Yes ||
          IntakeScriptFormControlStates.Not_sure
            ? this.form.controls.yearlyHOAFee.enable()
            : this.form.controls.yearlyHOAFee.disable();
        })
      )
      .subscribe();
    this.form.controls.hasLiens.valueChanges
      .pipe(
        tap((data) => {
          data === IntakeScriptFormControlStates.Yes ||
          IntakeScriptFormControlStates.Not_sure
            ? this.form.controls.hasLiensNotes.enable()
            : this.form.controls.hasLiensNotes.disable();
        })
      )
      .subscribe();
    this.form.controls.hasEasement.valueChanges
      .pipe(
        tap((data) => {
          data === IntakeScriptFormControlStates.Yes ||
          IntakeScriptFormControlStates.Not_sure
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

  formControlChange(controls, val) {
    this.form.controls[controls].setValue(val);
  }

  addFeature(event: MatChipInputEvent): void {
    const uniqueFeatures = this.form.controls.uniqueFeatures.value;
    const value = (event.value || '').trim();
    if (value) {
      uniqueFeatures.push(value);
    }
    event.chipInput!.clear();
  }

  removeFeature(feat: string): void {
    const uniqueFeatures = this.form.controls.uniqueFeatures.value;
    const index = uniqueFeatures.indexOf(feat);

    if (index >= 0) {
      uniqueFeatures.splice(index, 1);
    }
  }
  addimprovements(event: MatChipInputEvent): void {
    const improvements = this.form.controls.improvements.value;
    const value = (event.value || '').trim();
    if (value) {
      improvements.push(value);
    }
    event.chipInput!.clear();
  }

  removeimprovements(fruit: string): void {
    const improvements = this.form.controls.improvements.value;
    const index = improvements.indexOf(fruit);

    if (index >= 0) {
      improvements.splice(index, 1);
    }
  }

  addProperties(event: MatChipInputEvent): void {
    const additionalProperties = this.form.controls.additionalProperties.value;
    const value = (event.value || '').trim();
    if (value) {
      additionalProperties.push(value);
    }
    event.chipInput!.clear();
  }

  removeadditionalProperties(property: string): void {
    const additionalProperties = this.form.controls.additionalProperties.value;
    const index = additionalProperties.indexOf(property);

    if (index >= 0) {
      additionalProperties.splice(index, 1);
    }
  }
}
