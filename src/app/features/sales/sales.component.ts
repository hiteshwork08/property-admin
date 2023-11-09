import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SALES_ENUM, SalesStatus } from './sales.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { InitializeSalesComponent } from './component/initialize-sales/initialize-sales.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AdditionalBuyerComponent } from './component/additional-buyer/additional-buyer.component';
import { SalesDetailsInfoComponent } from './component/sales-details-info/sales-details-info.component';
import { InvestorReviewComponent } from './component/investor-review/investor-review.component';
import { SaleDetailsInfoFormData } from './component/sales-details-info/sales-details-info.adaptor';
import { GenerateDocComponent } from './component/generate-doc/generate-doc.component';
import { ReceiveDocsComponent } from './component/receive-docs/receive-docs.component';
import { NoteDetailsComponent } from './component/note-details/note-details.component';
import { ConfirmPaymentComponent } from './component/confirm-payment/confirm-payment.component';
import { RecordDeedSaleComponent } from './component/record-deed-sale/record-deed-sale.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    CommonModule,
    InitializeSalesComponent,
    AdditionalBuyerComponent,
    SalesDetailsInfoComponent,
    InvestorReviewComponent,
    GenerateDocComponent,
    ReceiveDocsComponent,
    NoteDetailsComponent,
    ConfirmPaymentComponent,
    RecordDeedSaleComponent,
  ],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  providers: [
    {
      provide: SalesStatus,
      useFactory: () => new SalesStatus(),
    },
  ],
})
export class SalesComponent {
  saleStatus = inject(SalesStatus);

  SALES_ENUM = SALES_ENUM;

  salesDetailsform: SaleDetailsInfoFormData;

  onFormDatasalesDetails(formData: SaleDetailsInfoFormData) {
    this.salesDetailsform = formData;
    console.log('Received data in parent component:', formData);
  }
}
