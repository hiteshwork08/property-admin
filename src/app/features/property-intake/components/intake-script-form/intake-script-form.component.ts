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
  ],
  providers: [provideFormAdaptor(SubmitIntakescriptOfferFormAdaptor, true)],
})
export class IntakeScriptFormComponent implements OnChanges {
  @Output() formData = new EventEmitter<SubmitIntakeScriptOfferFormData>();
  @Input() propertyIntakeFormData: SubmitIntakeScriptOfferFormData;
  @Input() readOnly: boolean = false;
  IntakeScriptFormControlStates = IntakeScriptFormControlStates;
  form = new FormGroup({
    ableToNotarize: new FormControl<IntakeScriptFormControlStateType1>(null),
    ableToNotarizeNotes: new FormControl<string>(null),
    haveDeedCopy: new FormControl<IntakeScriptFormControlStateType1>(null),
    canScanDeed: new FormControl<IntakeScriptFormControlStateType1>(null),
    yearsOwned: new FormControl<string>(null, [, Validators.pattern(/^\d+$/)]),
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
    pictures: new FormControl<FileList>(null),
    hasSurvey: new FormControl<IntakeScriptFormControlStateType1>(null),
    utilities: new FormControl<Utilities[]>([]),
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
