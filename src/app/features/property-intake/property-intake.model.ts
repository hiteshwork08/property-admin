export class PropertyIntakeModel {
  propertyIntakeStatus: 1 | 2 | 3 | 4 | null = 1;
}

export enum PropertIntakeFormEnum {
  receiveOfferForm = 1,
  scriptForm = 2,
  ProcessFrom = 3,
  FinalPurchase = 4,
}
