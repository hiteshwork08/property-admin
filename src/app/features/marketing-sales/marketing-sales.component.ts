import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ManageImagesComponent } from './manage-images/manage-images.component';

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
  ],
  templateUrl: './marketing-sales.component.html',
  styleUrls: ['./marketing-sales.component.scss'],
})
export class MarketingSalesComponent {}
