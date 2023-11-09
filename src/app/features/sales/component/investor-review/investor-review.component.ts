import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { InvestorReviewFormAdaptor } from './investor-review.adaptor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';

@Component({
  selector: 'app-investor-review',
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
    ReadOnlyFormDirective,
  ],
  templateUrl: './investor-review.component.html',
  styleUrls: ['./investor-review.component.scss'],
  providers: [provideFormAdaptor(InvestorReviewFormAdaptor, true)],
})
export class InvestorReviewComponent {
  @Input() readOnly = false;
  form = new FormGroup({
    approve: new FormControl(false),
    note: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.form.get('approve').valueChanges.subscribe((approve) => {
      if (approve === true) {
        this.form.get('note').clearValidators();
      } else {
        this.form.get('note').setValidators(Validators.required);
      }
      this.form.get('note').updateValueAndValidity();
    });
  }

  toggleNoteRequired(event: any) {
    const isApproved = this.form.get('approve').value;
    if (isApproved) {
      console.log('Approved');
    } else {
      console.log('Not Approved');
    }
  }
}
