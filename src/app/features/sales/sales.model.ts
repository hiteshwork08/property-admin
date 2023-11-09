import { Subject } from 'rxjs';

export class SalesStatus {
  value:
    | SALES_ENUM.INITIALIZE_SALES
    | SALES_ENUM.ADDITIONAL_BUYER
    | SALES_ENUM.SALES_DETAILS_INFO
    | SALES_ENUM.INVESTER_REVIEW
    | SALES_ENUM.GENERATE_DOCS
    | SALES_ENUM.RECORD_DEED
    | SALES_ENUM.RECEIVED_DOC
    | SALES_ENUM.NOTE_DETAILS
    | SALES_ENUM.CONFIRM_PAYMENT
    | SALES_ENUM.complete
    | null = 1;
}

export enum SALES_ENUM {
  INITIALIZE_SALES = 1,
  ADDITIONAL_BUYER = 2,
  SALES_DETAILS_INFO = 3,
  INVESTER_REVIEW = 4,
  GENERATE_DOCS = 5,
  RECEIVED_DOC = 6,
  NOTE_DETAILS = 7,
  CONFIRM_PAYMENT = 8,
  RECORD_DEED = 9,
  complete = 10,
}

export class SalesModel {
  saleType = new Subject();
}
