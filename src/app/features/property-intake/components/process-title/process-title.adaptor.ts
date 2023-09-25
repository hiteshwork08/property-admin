import { Injectable, inject } from "@angular/core";
import { PropertyIntakeModel } from "../../property-intake.model";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { AbstractRequestFormAdaptor } from "@common/form/abstract-request-form.adaptor";

export interface SubmitProcessTitleFormData{
    images:[['']]
}

export interface SubmitProcessTitle{}
@Injectable()
export class SubmitProcessTitleFormAdaptor extends AbstractRequestFormAdaptor<SubmitProcessTitleFormData, SubmitProcessTitle> {
    override name = "submit-process-title";
    private propertyIntakeModel = inject(PropertyIntakeModel);
    private toastr = inject(ToastrService)
    override onRequest(formGroup: SubmitProcessTitleFormData) {
      console.log("Form saved...", formGroup);
      this.toastr.success("Success!", "Record was saved successfully");  
      return of({});
    }
  }
  





  