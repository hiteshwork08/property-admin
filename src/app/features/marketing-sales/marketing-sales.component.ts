import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ManageImagesComponent } from './manage-images/manage-images.component';
import { ManageAdTextComponent } from './manage-ad-text/manage-ad-text.component';
import { PreMarketingCompletedComponent } from './pre-marketing-completed/pre-marketing-completed.component';
import { PreMarketingApprovalComponent } from './pre-marketing-approval/pre-marketing-approval.component';
import { ManageChannelAdComponent } from './manage-channel-ad/manage-channel-ad.component';

@Component({
  selector: 'app-marketing-sales',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    ManageImagesComponent,
    ManageAdTextComponent,
    PreMarketingCompletedComponent,
    PreMarketingApprovalComponent,
    ManageChannelAdComponent,
  ],
  templateUrl: './marketing-sales.component.html',
  styleUrls: ['./marketing-sales.component.scss'],
})
export class MarketingSalesComponent {}
