import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Invoice } from '../_models/AE-invoice.model';
import { GetDocumentsResponse, SubmittedDocument } from '../_models/documents.response.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) { }

  getDocuments(pageNumber: number, pageSize: number) {
    const token = localStorage.getItem('currentUser');
    return this.http.get<GetDocumentsResponse>(environment.backendUrl + `/api/Documents/get?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers: new HttpHeaders().set('Authorization','Bearer '+token!)}).pipe(map((data: GetDocumentsResponse) => {
        return data.result;
      }));
  }

  submitDocument(invoiceIds: string[]) {
    return this.http.post<SubmittedDocument>('/api/invoices/save', invoiceIds);
  }
}
