import { Injectable, inject } from '@angular/core';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { ToastrService } from 'ngx-toastr';
import { Subject, of } from 'rxjs';
import {
  PropertIntakeFormEnum,
  PropertyIntakeModel,
} from '../../property-intake.model';
import { FormGroup } from '@angular/forms';
import { WrapFormControl } from '@common/form/abstract-form.adaptor';

export type Utilities =
  | UtilitiesEnum.Electric
  | UtilitiesEnum.Gas
  | UtilitiesEnum.Water
  | UtilitiesEnum.Sewer
  | UtilitiesEnum.ElectricNearby
  | UtilitiesEnum.PowerPolesLinesNearby;

export enum UtilitiesEnum {
  Electric = 'Electric',
  Gas = 'Gas',
  Water = 'Water',
  Sewer = 'Sewer',
  ElectricNearby = 'Electric Nearby',
  PowerPolesLinesNearby = 'Power Poles Lines Nearby',
}

export enum IntakeScriptFormControlStates {
  Yes = 'Yes',
  No = 'No',
  Not_sure = 'Not Sure',
}

export type IntakeScriptFormControlStateType1 =
  | IntakeScriptFormControlStates.Yes
  | IntakeScriptFormControlStates.No;
export type IntakeScriptFormControlStateType2 =
  | IntakeScriptFormControlStates.Yes
  | IntakeScriptFormControlStates.No
  | IntakeScriptFormControlStates.Not_sure;

export const AllUtilities: Utilities[] = [
  UtilitiesEnum.Electric,
  UtilitiesEnum.Gas,
  UtilitiesEnum.Water,
  UtilitiesEnum.Sewer,
  UtilitiesEnum.ElectricNearby,
  UtilitiesEnum.PowerPolesLinesNearby,
];

export interface SubmitIntakeScriptOfferFormData {
  ableToNotarize: IntakeScriptFormControlStateType1;
  ableToNotarizeNotes: string;
  haveDeedCopy: IntakeScriptFormControlStateType1;
  canScanDeed: IntakeScriptFormControlStateType1;
  yearsOwned: string;
  hasPOA: IntakeScriptFormControlStateType2;
  yearlyPOAFee: string;
  hasHOA: IntakeScriptFormControlStateType2;
  yearlyHOAFee: string;
  backTaxesOwed: string;
  hasLiens: IntakeScriptFormControlStateType2;
  hasLiensNotes: string;
  uniqueFeatures: string[];
  hasEasement: IntakeScriptFormControlStateType2;
  hasEasementNotes: string;
  improvements: string[];
  additionalProperties: string[];
  inTakeScriptNotes: string;
  hasPictures: IntakeScriptFormControlStateType1;
  pictures: FileList | null;
  hasSurvey: IntakeScriptFormControlStateType1;
  utilities: Utilities[];
  Comment: string;
}

export interface SubmitIntakeScriptOfferRes {}

@Injectable()
export class SubmitIntakescriptOfferFormAdaptor extends AbstractRequestFormAdaptor<
  SubmitIntakeScriptOfferFormData,
  SubmitIntakeScriptOfferRes
> {
  override name = 'submit-intake-script-offer';
  private propertyIntakeModel = inject(PropertyIntakeModel);
  private toastr = inject(ToastrService);
  readonly formData$ = new Subject<SubmitIntakeScriptOfferFormData>();
  override onRequest(formGroup: SubmitIntakeScriptOfferFormData) {
    this.propertyIntakeModel.propertyIntakeStatus =
      PropertIntakeFormEnum.intakeApproval;

    console.log('Form saved...', formGroup);
    this.toastr.success('Success!', 'Record was saved successfully');
    return of({});
  }

  override onSuccess(
    formData: SubmitIntakeScriptOfferFormData,
    res: SubmitIntakeScriptOfferRes,
    formGroup: FormGroup<WrapFormControl<SubmitIntakeScriptOfferFormData>>
  ): void {
    this.formData$.next(formData);
  }
}
