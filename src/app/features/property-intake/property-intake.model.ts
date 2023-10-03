export class PropertyIntakeModel {
  propertyIntakeStatus: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null = 1;
}

export enum PropertIntakeFormEnum {
  receiveOfferForm = 1,
  scriptForm = 2,
  intakeApproval = 3,
  ProcessFrom = 4,
  FinalPurchase = 5,
  PrepareDocs = 6,
  ReceivedDocs = 7,
  RecordDeed = 8,
  PaymentComplete = 9,
  Complete = 10,
}
