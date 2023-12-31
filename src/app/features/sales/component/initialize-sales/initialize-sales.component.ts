import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FetchModule } from '@common/fetch/fetch.directive';
import { FormErrorModule } from '@common/form/field-error.directive';
import {
  FormHandlerModule,
  provideFormAdaptor,
} from '@common/form/form.directive';
import { SearchFilterPipe } from '@core/pipes/search-filter.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { InitalizesaleFormAdaptor } from './initialize-sales.adaptor';
import { distinctUntilChanged } from 'rxjs';
import { LeadInfoManagerComponent } from 'src/app/features/marketing-sales/leads-info/lead-info-manager/lead-info-manager.component';
import { LeadDetails } from 'src/app/features/marketing-sales/leads-info/lead-info-manager/lead-info-manager.adaptor';
import { SalesModel } from '../../sales.model';
import { ReadOnlyFormDirective } from '@common/directive/read-only-form.directive';

@Component({
  selector: 'app-initialize-sales',
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
    MatSelectModule,
    SearchFilterPipe,
    NgxMaskModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    LeadInfoManagerComponent,
    ReadOnlyFormDirective,
  ],
  templateUrl: './initialize-sales.component.html',
  styleUrls: ['./initialize-sales.component.scss'],
  providers: [provideFormAdaptor(InitalizesaleFormAdaptor, true)],
})
export class InitializeSalesComponent {
  @Input() readOnly: boolean = false;

  searchedLeadEmail: string[] = ['abcd@gmial.com', 'efg@gmail.com'];
  selectedLead: any = null;
  clientPropertyList: string[] = [
    'Alabama-Barbour-12546',
    'Alaska-Bethel-12546',
    'Arizona-Cochise-12546',
    'Alabama-Cochise-12546',
    'Alabama-Anchorage-12546',
  ];
  form = new FormGroup({
    propertyName: new FormControl<string>(null, Validators.required),
    lead: new FormControl<string>('', Validators.required),
    docFee: new FormControl<string>('', Validators.required),
    downPayment: new FormControl<string>('', Validators.required),
    initialAmount: new FormControl<string>(''),
    buyerType: new FormControl<string>('', Validators.required),
    saleType: new FormControl<string>('', Validators.required),
  });

  get docFee() {
    return this.form.get('docFee');
  }
  get downPayment() {
    return this.form.get('downPayment');
  }
  get initialAmount() {
    return this.form.get('initialAmount');
  }
  get saleType() {
    return this.form.get('saleType');
  }

  // constructor(public dialog: MatDialog, private salesModel: SalesModel) {
  //   // this.initialAmount.valueChanges
  //   //   .pipe(distinctUntilChanged())
  //   //   .subscribe((initialAmountValue) => {
  //   //     if (initialAmountValue) {
  //   //       this.docFee.removeValidators(Validators.required);
  //   //       this.downPayment.removeValidators(Validators.required);
  //   //       this.docFee.reset();
  //   //       this.downPayment.reset();
  //   //       this.docFee.disable();
  //   //       this.downPayment.disable();
  //   //     } else {
  //   //       this.docFee.addValidators(Validators.required);
  //   //       this.downPayment.addValidators(Validators.required);
  //   //       this.docFee.enable();
  //   //       this.downPayment.enable();
  //   //     }
  //   //     this.form.updateValueAndValidity();
  //   //   });

  //   this.initialAmount.disable();

  //   this.docFee.valueChanges
  //     .pipe(distinctUntilChanged())
  //     .subscribe((docfeeValue) => {
  //       if (docfeeValue) {
  //         this.downPayment.removeValidators(Validators.required);
  //       } else {
  //         this.downPayment.addValidators(Validators.required);
  //       }
  //       // if (docfeeValue) {
  //       //   this.initialAmount.disable();
  //       // } else {
  //       //   this.initialAmount.disable();
  //       // }
  //       this.form.updateValueAndValidity();
  //     });

  //   this.downPayment.valueChanges
  //     .pipe(distinctUntilChanged())
  //     .subscribe((downpaymentValue) => {
  //       if (downpaymentValue) {
  //         this.docFee.removeValidators(Validators.required);
  //       } else {
  //         this.docFee.addValidators(Validators.required);
  //       }
  //       // if (downpaymentValue) {
  //       //   this.initialAmount.disable();
  //       // } else {
  //       //   this.initialAmount.disable();
  //       // }
  //       this.form.updateValueAndValidity();
  //     });
  //   this.saleType.valueChanges.subscribe((value) =>
  //     this.salesModel.saleType.next(value)
  //   );
  // }

  constructor(public dialog: MatDialog, private salesModel: SalesModel) {
    this.initialAmount.disable();

    this.docFee.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((docfeeValue) => {
        if (docfeeValue) {
          this.downPayment.clearValidators();
          this.downPayment.removeValidators(Validators.required);
          this.downPayment.updateValueAndValidity();
        } else {
          this.downPayment.addValidators(Validators.required);
        }

        this.form.updateValueAndValidity();
      });

    this.downPayment.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((downpaymentValue) => {
        if (downpaymentValue) {
          this.docFee.clearValidators();
          this.docFee.removeValidators(Validators.required);
          this.docFee.updateValueAndValidity();
        } else {
          this.docFee.addValidators(Validators.required);
        }

        this.form.updateValueAndValidity();
      });

    this.saleType.valueChanges.subscribe((value) =>
      this.salesModel.saleType.next(value)
    );
  }

  openDialogWithRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  saveData(data: LeadDetails) {
    this.dialog.closeAll();
    this.searchedLeadEmail.push(data.email);
  }
}
