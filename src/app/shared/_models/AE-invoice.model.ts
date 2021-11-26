export interface Issuer {
  id: string;
}

export interface Address {
  country: string;
  governate: string;
  regionCity: string;
  street: string;
  buildingNumber: string;
  postalCode: string;
  floor: string;
  room: string;
  landmark: string;
  additionalInformation: string;
}

export interface Receiver {
  address?: Address;
  type?: string;
  id?: string;
  name: string;
}

export interface Payment {
  bankName: string;
  bankAddress: string;
  bankAccountNo: string;
  bankAccountIBAN: string;
  swiftCode: string;
  terms: string;
}

export interface Delivery {
  approach: string;
  packaging: string;
  dateValidity: Date;
  exportPort: string;
  grossWeight: number;
  netWeight: number;
  terms: string;
}

export interface UnitValue {
  currencySold: string;
  amountEGP: number;
}

export interface Discount {
  rate: number;
  amount: number;
}

export interface TaxableItem {
  taxType: string;
  amount: number;
  subType: string;
  rate: number;
}

export interface InvoiceLine {
  description: string;
  itemType: string;
  itemCode: string;
  unitType: string;
  quantity: number;
  internalCode?: string;
  valueDifference?: number;
  totalTaxableFees?: number;
  itemsDiscount: number;
  unitValue: UnitValue;
  discount?: Discount;
  taxableItems?: TaxableItem[];
}

export interface Document {
  issuer: Issuer;
  receiver: Receiver;
  documentType: string;
  documentTypeVersion: string;
  dateTimeIssued: Date;
  taxpayerActivityCode: string;
  internalID?: string;
  purchaseOrderReference?: string;
  purchaseOrderDescription?: string;
  salesOrderReference?: string;
  salesOrderDescription?: string;
  proformaInvoiceNumber?: string;
  payment?: Payment;
  delivery?: Delivery;
  invoiceLines: InvoiceLine[];
  extraDiscountAmount?: number;
}

export interface InvoiceDocument {
  documents: Document[];
}
