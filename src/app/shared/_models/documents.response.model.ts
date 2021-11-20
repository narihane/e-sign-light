
export interface DocumentResult {
    publicUrl: string;
    uuid: string;
    submissionUUID: string;
    longId: string;
    internalId: string;
    typeName: string;
    documentTypeNamePrimaryLang: string;
    documentTypeNameSecondaryLang: string;
    typeVersionName: string;
    issuerId: string;
    issuerName: string;
    receiverId: string;
    receiverName: string;
    dateTimeIssued: Date;
    dateTimeReceived: Date;
    totalSales: number;
    totalDiscount: number;
    netAmount: number;
    total: number;
    maxPercision: number;
    invoiceLineItemCodes?: any;
    cancelRequestDate?: any;
    rejectRequestDate?: any;
    cancelRequestDelayedDate?: any;
    rejectRequestDelayedDate?: any;
    declineCancelRequestDate?: any;
    declineRejectRequestDate?: any;
    documentStatusReason: string;
    status: string;
    createdByUserId: string;
}

export interface Metadata {
    totalPages: number;
    totalCount: number;
}

export interface GetDocumentsResponse {
    result: DocumentResult[];
    metadata: Metadata;
}

export interface AcceptedDocument {
    uuid: string;
    longId: string;
    internalId: string;
}

export interface RejectedDocument {
    internalId: string;
    error: Error;
}

export interface Error {
    code: string;
    message: string;
    target: string;
    propertyPath: string;
    details: Detail[];
}

export interface Detail {
    code: string;
    message: string;
    target: string;
    propertyPath: string;
    details: string;
}

export interface SubmittedDocument {
    submissionId: string;
    acceptedDocuments: AcceptedDocument[];
    rejectedDocuments: any[];
}
