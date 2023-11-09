import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { GenerateDocsFormAdaptor } from './generate-doc.adaptor';

@Component({
  selector: 'app-generate-doc',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    FormHandlerModule,
    FormErrorModule,
    FetchModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './generate-doc.component.html',
  styleUrls: ['./generate-doc.component.scss'],
  providers: [provideFormAdaptor(GenerateDocsFormAdaptor, true)],
})
export class GenerateDocComponent {}
