import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  FetchModule,
  provideFetchAdaptor,
} from '@common/fetch/fetch.directive';
import {
  FetchStatesAdaptor,
  INTAKE_DROPDOWN,
  StatesInfo,
} from '@common/adaptors/fetch-state.adaptor';
import { FormErrorModule } from '@common/form/field-error.directive';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { SearchFilterPipe } from '@core/pipes/search-filter.pipe';
import { INTAKE_TYPES } from 'src/assets/mocks/intake-type';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';
import { SubmitIntakeReceiveOfferFormAdaptor } from './receive-offer-form.adaptor';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';
@Component({
  selector: 'app-receive-offer-form',
  templateUrl: './receive-offer-form.component.html',
  styleUrls: ['./receive-offer-form.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    MatSelectModule,
    SearchFilterPipe,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule,
    MatButtonModule,
    ReadOnlyFormDirective,
  ],
  providers: [
    provideFetchAdaptor(FetchStatesAdaptor, true),
    provideFormAdaptor(SubmitIntakeReceiveOfferFormAdaptor, true),
  ],
})
export class ReceiveOfferFormComponent {
  @Input() readOnly = false;
  form = new FormGroup({
    selectedState: new FormControl<StatesInfo>(null, {
      validators: Validators.required,
      nonNullable: true,
    }),
    state: new FormControl<string>(null, {
      validators: Validators.required,
      nonNullable: true,
    }),
    county: new FormControl<string>(null, {
      validators: Validators.required,
      nonNullable: true,
    }),
    APN: new FormControl<string>(null, {
      validators: Validators.required,
      nonNullable: true,
    }),
    intakeType: new FormControl<number>(null, {
      validators: Validators.required,
      nonNullable: true,
    }),
    sellerList: new FormControl<string[]>([]),
    dateReceived: new FormControl<Date>(new Date(), {
      validators: Validators.required,
      nonNullable: true,
    }),
    initialOfferAmount: new FormControl(),
    initialCounterOfferAmount: new FormControl(),
    note: new FormControl<string>(undefined),
  });
  availableCounty: string[] = [];
  intakeTypes: INTAKE_DROPDOWN[] = INTAKE_TYPES;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor() {
    this.form.controls.selectedState.valueChanges
      .pipe(tap((data) => this.mapCountyBasedOnState(data)))
      .subscribe();
  }

  mapCountyBasedOnState(state: StatesInfo) {
    this.form.controls.state.setValue(state.name);
    this.availableCounty = state.counties;
  }

  addSeller(event: MatChipInputEvent): void {
    const sellerList = this.form.controls.sellerList.value;
    const value = (event.value || '').trim();
    if (value) {
      sellerList.push(value);
    }
    event.chipInput!.clear();
  }

  removeSeller(fruit: string): void {
    const sellerList = this.form.controls.sellerList.value;
    const index = sellerList.indexOf(fruit);

    if (index >= 0) {
      sellerList.splice(index, 1);
    }
  }
}
