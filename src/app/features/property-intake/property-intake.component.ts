import { Component, inject } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReceiveOfferFormComponent } from "./components/receive-offer-form/receive-offer-form.component";
import { PropertIntakeFormEnum, PropertyIntakeModel } from "./property-intake.model";
import { IntakeScriptFormComponent } from "./components/intake-script-form/intake-script-form.component";
import { ProcessTitleComponent } from "./components/process-title/process-title.component";
import { FinalPurchaseFormComponent } from "./components/final-purchase-form/final-purchase-form.component";
import { IntakeScriptApprovalFormComponent } from "./components/intake-script-approval-form/intake-script-approval-form.component";
import { SubmitIntakeScriptOfferFormData } from "./components/intake-script-form/intake-script-form.adaptor";
@Component({
  selector: "app-property-intake",
  templateUrl: "./property-intake.component.html",
  styleUrls: ["./property-intake.component.scss"],
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatFormFieldModule, MatInputModule, ReceiveOfferFormComponent, IntakeScriptFormComponent,IntakeScriptApprovalFormComponent, ProcessTitleComponent,FinalPurchaseFormComponent],
  providers: [{ provide: PropertyIntakeModel, useFactory: () => new PropertyIntakeModel() }],
})
export class PropertyIntakeComponent {
  propertyIntakeFormData :SubmitIntakeScriptOfferFormData
  public propertyIntakeModel = inject(PropertyIntakeModel);
  PropertIntakeFormEnum = PropertIntakeFormEnum;

  onFormDataReceived(formData: SubmitIntakeScriptOfferFormData) { 
    this.propertyIntakeFormData = formData
    console.log('Received data in parent component:', formData);
  }
}



