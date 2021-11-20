import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Invoice } from '../_models/AE-invoice.model';
import { Documents, Document } from '../_models/document.model';

@Injectable()
export class InvoiceService {
    constructor(private http: HttpClient) { }

    getAllInvoices(pageNumber: number, pageSize: number) {
        return this.http.get<Documents>(`/api/taxpayer/get?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    getInvoiceById(id: number) {
        return this.http.get<Document>(`/api/Invoices/get/${id}`);
    }

    saveInvoice(invoice: Invoice) {
        return this.http.post<string>('/api/invoices/save', invoice);
    }
}
