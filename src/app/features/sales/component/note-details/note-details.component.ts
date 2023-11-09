import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { NoteDetailsFormAdaptor } from './note-details.adaptor';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';

@Component({
  selector: 'app-note-details',
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
    FormsModule,
    ReadOnlyFormDirective,
  ],
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  providers: [provideFormAdaptor(NoteDetailsFormAdaptor, true)],
})
export class NoteDetailsComponent {
  @Input() readOnly = false;
  form = new FormGroup({
    noteDetails: new FormControl(''),
  });
}
