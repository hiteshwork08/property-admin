import { Injectable, inject } from "@angular/core";
import { AbstractRequestFormAdaptor } from "@common/form/abstract-request-form.adaptor";
import { of } from "rxjs";
import { PropertIntakeFormEnum, PropertyIntakeModel } from "../../property-intake.model";
import { ToastrService } from "ngx-toastr";

export interface SubmitIntakeReceiveOfferFormData {
  state: string;
  county: string;
  APN: string;
  intakeType: number;
  sellerList: string[];
  dateReceived: Date;
  initialOfferAmount: number;
  initialCounterOfferAmount: number;
  note: string;
}
export interface SubmitIntakeReceiveOfferRes {}

@Injectable()
export class SubmitIntakeReceiveOfferFormAdaptor extends AbstractRequestFormAdaptor<SubmitIntakeReceiveOfferFormData, SubmitIntakeReceiveOfferRes> {
  override name = "submit-intake-receive-offer";
  private propertyIntakeModel = inject(PropertyIntakeModel);
  private toastr = inject(ToastrService);
  override onRequest(formGroup: SubmitIntakeReceiveOfferFormData) {
    this.propertyIntakeModel.propertyIntakeStatus = PropertIntakeFormEnum.scriptForm;
    console.log("Form saved...", formGroup);
    this.toastr.success("Success!", "Record was saved successfully");
    return of({});
  }
}
