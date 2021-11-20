export interface Delivery {
    id: number;
    approach: string;
    packaging: string;
    dateValidity: Date;
    exportPort: string;
    countryOfOrigin?: any;
    grossWeight: number;
    netWeight: number;
    terms: string;
}

export interface Address {
    id: number;
    branchId: string;
    issuerId: number;
    receiverId?: any;
    country: string;
    governate: string;
    regionCity: string;
    street: string;
    buildingNumber: string;
    postalCode: string;
    floor: string;
    flatNumber?: any;
    landmark: string;
    additionalInformation: string;
}

export interface Payment {
    id: number;
    bankName: string;
    bankAddress: string;
    bankAccountNo: string;
    bankAccountIban: string;
    swiftCode: string;
    terms: string;
}

export interface Receiver {
    addresses: Address[];
    id: number;
    type: string;
    registrationNumber: string;
    name: string;
}

export interface TaxableItem {
    id: number;
    taxType: string;
    amount: number;
    subType: string;
    rate: number;
    invoiceLineId: number;
}

export interface InvoiceLine {
    taxableItems: TaxableItem[];
    invoiceLineId: number;
    invoiceInternalId: string;
    description: string;
    itemType: string;
    itemCode: string;
    unitType: string;
    quantity: number;
    currencySold: string;
    amountEgp: number;
    amountSold?: any;
    currencyExchangeRate?: any;
    salesTotal: number;
    total: number;
    valueDifference: number;
    totalTaxableFees: number;
    netTotal: number;
    itemsDiscount: number;
    discountRate: number;
    discountAmount: number;
    internalCode: string;
}

export interface Issuer {
    addresses: Address[];
    invoices: Document[];
    id: number;
    type: string;
    registrationNumber: string;
    name: string;
    priceThreshold: number;
}

export interface Document {
    delivery: Delivery;
    issuer: Issuer;
    payment: Payment;
    receiver: Receiver;
    invoiceLines: InvoiceLine[];
    signatures: any[];
    submittedDocs: any[];
    interanlId: string;
    issuerId: number;
    receiverId: number;
    documentType: string;
    documentTypeversion: string;
    dateIssued: Date;
    purchaseOrderReference: string;
    purchaseOrderDescription: string;
    salesOrderReference: string;
    salesOrderDescription: string;
    proformaInvoiceNumber: string;
    paymentId: number;
    deliveryId: number;
    totalSalesAmount: number;
    totalDiscountAmount: number;
    netAmount: number;
    extraDiscountAmount: number;
    totalItemsDiscountAmount: number;
    totalAmount: number;
    taxpayerActivityCode: string;
}

export interface Documents {
    invoices: Document[];
    totalCount: number;
}


