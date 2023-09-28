import { Injectable, inject } from "@angular/core";
import { AbstractRequestFormAdaptor } from "@common/form/abstract-request-form.adaptor";
import { ToastrService } from "ngx-toastr";
import { Subject, of } from "rxjs";
import {  PropertIntakeFormEnum, PropertyIntakeModel } from "../../property-intake.model";


export interface intakeScriptApprovalFormData {
    comment:string
  }


export interface IntakeScriptApprovalFormData {}

@Injectable()
export class IntakeScriptApprovalFormAdaptor extends AbstractRequestFormAdaptor<intakeScriptApprovalFormData, IntakeScriptApprovalFormData> {
    override name = "intake-script-approval-form";
    private propertyIntakeModel = inject(PropertyIntakeModel);
    private toastr = inject(ToastrService);
    readonly formData$ = new Subject<intakeScriptApprovalFormData>();
    override onRequest(formGroup: intakeScriptApprovalFormData) {
      
// TODO: need to open after complete the 
      this.propertyIntakeModel.propertyIntakeStatus = PropertIntakeFormEnum.ProcessFrom;
  
      console.log("Form Approved", formGroup);
      this.toastr.success("Approved SuccessFully!", "Form Approved Successfuly");
      return of({});
    }

    // override onSuccess(formData: intakeScriptApprovalFormData, res: IntakeScriptApprovalFormData, formGroup: FormGroup<WrapFormControl<intakeScriptApprovalFormData>>): void {
    //   this.formData$.next(formData)
    // }
  }
  