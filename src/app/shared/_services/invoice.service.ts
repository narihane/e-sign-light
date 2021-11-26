import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InvoiceDocument, Document } from '../_models/AE-invoice.model';
import { Documents } from '../_models/document.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class InvoiceService {
  constructor(private http: HttpClient) { }

  getAllInvoices(pageNumber: number, pageSize: number) {
    const token = localStorage.getItem('currentUser');
    return this.http.get<Documents>(environment.backendUrl + `/api/Invoices/get?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token!) })
      .pipe(map((data: Documents) => {
        console.log(data)
        return data.invoices;
      }));
  }

  getInvoiceById(id: number) {
    return this.http.get<Document>(`/api/Invoices/get/${id}`);
  }

  saveInvoice(invoice: InvoiceDocument) {
    const token = localStorage.getItem('currentUser');
    return this.http.post<string>(environment.backendUrl + '/api/invoices/save', invoice,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token!) });
    // .pipe(map((data: string) => {
    //   return data;
    // }));
  }
}
