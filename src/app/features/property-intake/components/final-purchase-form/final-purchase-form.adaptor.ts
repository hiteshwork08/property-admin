import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AbstractRequestFormAdaptor } from '@common/form/abstract-request-form.adaptor';
import { PropertIntakeFormEnum, PropertyIntakeModel } from '../../property-intake.model';
import { of } from 'rxjs';

export interface FinalPurchaseAmount {
  finalofferamount: number;
  note: string;
}

export interface FinalPurcahseAmountForm {}
@Injectable()

export class FinalPurcahseAmountFormAdaptor extends AbstractRequestFormAdaptor <FinalPurchaseAmount,FinalPurcahseAmountForm>{
    override name ="final-purchase";
    private propertyIntakeModel = inject(PropertyIntakeModel);
    private toaster = inject(ToastrService);
    override onRequest (formGroup: FinalPurcahseAmountForm){
      // TODO: update FormStatus
      // this.propertyIntakeModel.propertyIntakeStatus = PropertIntakeFormEnum.PaymentComplete;
  
        console.log("final purcase form saved...",formGroup);
        this.toaster.success("sucess!","Record was saved sucessfully")
        return of({});
    }
}