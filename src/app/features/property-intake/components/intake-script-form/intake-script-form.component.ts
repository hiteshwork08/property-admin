import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { DropFilesComponent } from '@common/drop-files/drop-files.component';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';

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
    DropFilesComponent,
    ReadOnlyFormDirective,
  ],
  providers: [provideFormAdaptor(SubmitIntakescriptOfferFormAdaptor, true)],
})
export class IntakeScriptFormComponent implements OnChanges {
  @Output() formData = new EventEmitter<SubmitIntakeScriptOfferFormData>();
  @Input() propertyIntakeFormData: SubmitIntakeScriptOfferFormData;
  @Input() readOnly: boolean = false;
  IntakeScriptFormControlStates = IntakeScriptFormControlStates;
  form = new FormGroup({
    ableToNotarize: new FormControl<IntakeScriptFormControlStateType1>(
      null,
      Validators.required
    ),
    ableToNotarizeNotes: new FormControl<string>(null),
    haveDeedCopy: new FormControl<IntakeScriptFormControlStateType1>(
      null,
      Validators.required
    ),
    canScanDeed: new FormControl<IntakeScriptFormControlStateType1>(
      null,
      Validators.required
    ),
    yearsOwned: new FormControl<string>(null, Validators.required),
    hasPOA: new FormControl<IntakeScriptFormControlStateType2>(
      null,
      Validators.required
    ),
    yearlyPOAFee: new FormControl<string>(null),
    hasHOA: new FormControl<IntakeScriptFormControlStateType2>(
      null,
      Validators.required
    ),
    yearlyHOAFee: new FormControl<string>(null),
    backTaxesOwed: new FormControl<string>(null, Validators.required),
    hasLiens: new FormControl<IntakeScriptFormControlStateType2>(
      null,
      Validators.required
    ),
    hasLiensNotes: new FormControl<string>(null, Validators.required),
    uniqueFeatures: new FormControl<string[]>([]),
    hasEasement: new FormControl<IntakeScriptFormControlStateType2>(
      null,
      Validators.required
    ),
    hasEasementNotes: new FormControl<string>(null),
    improvements: new FormControl<string[]>([]),
    additionalProperties: new FormControl<string[]>([]),
    inTakeScriptNotes: new FormControl<string>(null),
    hasPictures: new FormControl<IntakeScriptFormControlStateType1>(
      null,
      Validators.required
    ),
    pictures: new FormControl<FileList>(null),
    hasSurvey: new FormControl<IntakeScriptFormControlStateType1>(
      null,
      Validators.required
    ),
    utilities: new FormControl<Utilities[]>([], Validators.required),
    Comment: new FormControl<string>(null),
  });
  separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes['propertyIntakeFormData'] &&
      changes['propertyIntakeFormData']['currentValue']
    ) {
      this.propertyIntakeFormData =
        changes['propertyIntakeFormData']['currentValue'];
      this.form.patchValue(this.propertyIntakeFormData);
    }
  }

  constructor(
    private submitIntakescriptOfferFormAdaptor: SubmitIntakescriptOfferFormAdaptor
  ) {
    this.submitIntakescriptOfferFormAdaptor.formData$.subscribe((data) =>
      this.formData.emit(data)
    );
    // this.form.controls.Comment.addValidators(Validators.required);
    // this.form.controls.Comment.clearValidators();

    this.form.get('ableToNotarize').valueChanges.subscribe((value) => {
      if (value === IntakeScriptFormControlStates.No) {
        this.form.get('ableToNotarizeNotes').setValidators(Validators.required);
      } else {
        this.form.get('ableToNotarizeNotes').clearValidators();
      }
      this.form.get('ableToNotarizeNotes').updateValueAndValidity();
    });

    this.form.get('hasPOA').valueChanges.subscribe((value) => {
      if (value === IntakeScriptFormControlStates.Yes) {
        this.form.get('yearlyPOAFee').setValidators(Validators.required);
      } else {
        this.form.get('yearlyPOAFee').clearValidators();
      }
      this.form.get('yearlyPOAFee').updateValueAndValidity();
    });

    this.form.get('hasHOA').valueChanges.subscribe((value) => {
      if (value === IntakeScriptFormControlStates.Yes) {
        this.form.get('yearlyHOAFee').setValidators(Validators.required);
      } else {
        this.form.get('yearlyHOAFee').clearValidators();
      }
      this.form.get('yearlyHOAFee').updateValueAndValidity();
    });

    this.form.get('hasLiens').valueChanges.subscribe((value) => {
      if (value === IntakeScriptFormControlStates.Yes) {
        this.form.get('hasLiensNotes').setValidators(Validators.required);
      } else {
        this.form.get('hasLiensNotes').clearValidators();
      }
      this.form.get('hasLiensNotes').updateValueAndValidity();
    });

    this.form.get('hasEasement').valueChanges.subscribe((value) => {
      if (value === IntakeScriptFormControlStates.Yes) {
        this.form.get('hasEasementNotes').setValidators(Validators.required);
      } else {
        this.form.get('hasEasementNotes').clearValidators();
      }
      this.form.get('hasEasementNotes').updateValueAndValidity();
    });

    this.form.get('hasPictures').valueChanges.subscribe((value) => {
      if (value === IntakeScriptFormControlStates.Yes) {
        this.form.get('pictures').setValidators(Validators.required);
      } else {
        this.form.get('pictures').clearValidators();
      }
      this.form.get('pictures').updateValueAndValidity();
    });
  }

  utilities: Utilities[] = AllUtilities;

  formControlChange(controls, val) {
    this.form.controls[controls].setValue(val);
  }

  addFeature(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.form.controls.uniqueFeatures.setValue([
        ...this.form.controls.uniqueFeatures.value,
        value,
      ]);
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
    const value = (event.value || '').trim();
    if (value) {
      this.form.controls.improvements.setValue([
        ...this.form.controls.improvements.value,
        value,
      ]);
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
    const value = (event.value || '').trim();
    if (value) {
      this.form.controls.additionalProperties.setValue([
        ...this.form.controls.additionalProperties.value,
        value,
      ]);
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

  get pictures() {
    return this.form.controls['pictures'];
  }

  onFileDropped(event: FileList | File) {
    if (event instanceof FileList) this.pictures.setValue(event);
  }

  deleteFile() {
    this.pictures.reset();
  }
}
