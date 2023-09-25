import { Injectable, inject } from "@angular/core";
import { AbstractRequestFormAdaptor } from "@common/form/abstract-request-form.adaptor";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { PropertIntakeFormEnum, PropertyIntakeModel } from "../../property-intake.model";

export type Utilities = UtilitiesEnum.Electric | UtilitiesEnum.Gas | UtilitiesEnum.Water |UtilitiesEnum.Sewer| UtilitiesEnum.ElectricNearby | UtilitiesEnum.PowerPolesLinesNearby

export enum UtilitiesEnum {
    Electric = 'Electric',
    Gas = 'Gas',
    Water ='Water',
    Sewer = 'Sewer',
    ElectricNearby = 'ElectricNearby',
    PowerPolesLinesNearby= 'PowerPolesLinesNearby'
}

export const AllUtilities : Utilities[] = [UtilitiesEnum.Electric, UtilitiesEnum.Gas,UtilitiesEnum.Water ,UtilitiesEnum.Sewer, UtilitiesEnum.ElectricNearby , UtilitiesEnum.PowerPolesLinesNearby ]

export interface SubmitIntakeScriptOfferFormData {
    ableToNotarize: boolean
    ableToNotarizeNotes: string
    haveDeedCopy: boolean
    canScanDeed: boolean
    yearsOwned: string
    hasPOA: boolean
    yearlyPOAFee: string
    hasHOA: boolean
    yearlyHOAFee: string
    backTaxesOwed: string
    hasLiens: boolean
    hasLiensNotes: string
    uniqueFeatures: string
    hasEasement: boolean
    hasEasementNotes: string
    improvements: string
    additionalProperties: string
    inTakeScriptNotes: string
    hasPictures: boolean
    hasSurvey: boolean
    utilities: Utilities[]
    Comment:string
  }


export interface SubmitIntakeScriptOfferRes {}

@Injectable()
export class SubmitIntakescriptOfferFormAdaptor extends AbstractRequestFormAdaptor<SubmitIntakeScriptOfferFormData, SubmitIntakeScriptOfferRes> {
    override name = "submit-intake-script-offer";
    private propertyIntakeModel = inject(PropertyIntakeModel);
    private toastr = inject(ToastrService);
    override onRequest(formGroup: SubmitIntakeScriptOfferFormData) {
      this.propertyIntakeModel.propertyIntakeStatus = PropertIntakeFormEnum.ProcessFrom;
  
      console.log("Form saved...", formGroup);
      this.toastr.success("Success!", "Record was saved successfully");
      return of({});
    }
  }
  