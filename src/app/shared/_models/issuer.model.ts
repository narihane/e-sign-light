export interface Issuer {
    type: string;
    name: string;
    registrationNumber: string;
    priceThreshold: number;
    addresses: Address[];
}

export interface Address {
    branchID: string;
    country: string;
    governate: string;
    regionCity: string;
    street: string;
    buildingNumber: string;
    postalCode?: string;
    floor?: string;
    room?: string;
    landmark?: string;
    additionalInformation?: string;
}
