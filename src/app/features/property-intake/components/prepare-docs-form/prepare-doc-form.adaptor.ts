import { Injectable, inject } from "@angular/core";
import { AbstractRequestFormAdaptor } from "@common/form/abstract-request-form.adaptor";
import { ToastrService } from "ngx-toastr";
import { Subject, of } from "rxjs";
import { PropertIntakeFormEnum, PropertyIntakeModel } from "../../property-intake.model";
import { FormGroup } from "@angular/forms";
import { WrapFormControl } from "@common/form/abstract-form.adaptor";

export interface PrepareDocsFormData {
  deedDocument: string,
  salesAgreementDocument: string,
  notes: string,
  }


export interface PrepareDocsRes {}

@Injectable()
export class PrepareDocsFormAdaptor extends AbstractRequestFormAdaptor<PrepareDocsFormData, PrepareDocsRes> {
    override name = "prepare-doc-form";
    private propertyIntakeModel = inject(PropertyIntakeModel);
    private toastr = inject(ToastrService);
    readonly formData$ = new Subject<PrepareDocsFormData>();
    override onRequest(formGroup: PrepareDocsFormData) {

      this.propertyIntakeModel.propertyIntakeStatus = PropertIntakeFormEnum.ReceivedDocs;
  
      console.log("Form saved...", formGroup);
      this.toastr.success("Success!", "Completed SucessFully");
      return of({});
    }

    override onSuccess(formData: PrepareDocsFormData, res: PrepareDocsRes, formGroup: FormGroup<WrapFormControl<PrepareDocsFormData>>): void {
      this.formData$.next(formData)
    }
  }
  