import { Component, Input, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReceiveOfferFormComponent } from './components/receive-offer-form/receive-offer-form.component';
import {
  PropertIntakeFormEnum,
  PropertyIntakeModel,
} from './property-intake.model';
import { IntakeScriptFormComponent } from './components/intake-script-form/intake-script-form.component';
import { ProcessTitleComponent } from './components/process-title/process-title.component';
import { FinalPurchaseFormComponent } from './components/final-purchase-form/final-purchase-form.component';
import { IntakeScriptApprovalFormComponent } from './components/intake-script-approval-form/intake-script-approval-form.component';
import { SubmitIntakeScriptOfferFormData } from './components/intake-script-form/intake-script-form.adaptor';
import { PrepareDocsFormComponent } from './components/prepare-docs-form/prepare-docs-form.component';
import { ReceivedDocsFormComponent } from './components/received-docs-form/received-docs-form.component';
import { RecordDeedFormComponent } from './components/record-deed-form/record-deed-form.component';
import { PaymentCompleteFormComponent } from './components/payment-complete-form/payment-complete-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MarketingSalesComponent } from '../marketing-sales/marketing-sales.component';
import { CommonModule } from '@angular/common';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';
import { SalesComponent } from '../sales/sales.component';
@Component({
  selector: 'app-property-intake',
  templateUrl: './property-intake.component.html',
  styleUrls: ['./property-intake.component.scss'],
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    CommonModule,
    ReceiveOfferFormComponent,
    IntakeScriptFormComponent,
    IntakeScriptApprovalFormComponent,
    ProcessTitleComponent,
    FinalPurchaseFormComponent,
    PrepareDocsFormComponent,
    ReceivedDocsFormComponent,
    RecordDeedFormComponent,
    PaymentCompleteFormComponent,
    MarketingSalesComponent,
    ReadOnlyFormDirective,
    SalesComponent,
  ],
  providers: [
    {
      provide: PropertyIntakeModel,
      useFactory: () => new PropertyIntakeModel(),
    },
  ],
})
export class PropertyIntakeComponent {
  @Input() readOnly: boolean = true;

  public propertyIntakeModel = inject(PropertyIntakeModel);
  PropertIntakeFormEnum = PropertIntakeFormEnum;
  propertyIntakeFormData: SubmitIntakeScriptOfferFormData;

  onFormDataReceived(formData: SubmitIntakeScriptOfferFormData) {
    this.propertyIntakeFormData = formData;
    console.log('Received data in parent component:', formData);
  }
}
