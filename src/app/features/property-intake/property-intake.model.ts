export class PropertyIntakeModel {
  propertyIntakeStatus: 1 | 2 | 3 | 4 |5| null = 1;
}

export enum PropertIntakeFormEnum {
  receiveOfferForm = 1,
  scriptForm = 2,
  intakeApproval = 3,
  ProcessFrom = 4,
  FinalPurchase = 5,
}
