import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pre-marketing-completed',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './pre-marketing-completed.component.html',
  styleUrls: ['./pre-marketing-completed.component.scss'],
})
export class PreMarketingCompletedComponent {}
