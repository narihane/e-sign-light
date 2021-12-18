import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InvoiceDocument, Document } from '../_models/AE-invoice.model';
import { Documents } from '../_models/document.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Injectable()
export class InvoiceService {
  constructor(private http: HttpClient) {}

  getAllInvoices(
    pageNumber: number,
    pageSize: number,
    dateRange: FormGroup,
    sortDate: number
  ) {
    const token = localStorage.getItem('currentUser');
    console.log('old', pageNumber);
    pageNumber = pageNumber + 1;
    console.log('new', pageNumber);
    const dateStart: string =
      dateRange.value.start != null
        ? moment(new Date(dateRange.value.start)).format('YYYY-MM-DD')
        : '';
    const dateEnd: string =
      dateRange.value.end != null
        ? moment(new Date(dateRange.value.end)).format('YYYY-MM-DD')
        : '';
    console.log(dateStart);
    return this.http
      .get<Documents>(
        environment.backendUrl +
          `/api/Invoices/get?pageNumber=${pageNumber}&pageSize=${pageSize}&from=${dateStart}&to=${dateEnd}
          &sortByDate=${sortDate}`,
        { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token!) }
      )
      .pipe(
        map((data: Documents) => {
          console.log(data);
          return data;
        })
      );
  }

  getInvoiceById(id: string) {
    const token = localStorage.getItem('currentUser');
    return this.http.get<Document>(
      environment.backendUrl + `/api/Invoices/get/${id}`,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token!) }
    );
  }

  deleteInvoiceById(id: string) {
    const token = localStorage.getItem('currentUser');
    return this.http.delete<Document>(
      environment.backendUrl + `/api/Invoices/delete/${id}`,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token!) }
    );
  }

  editInvoice(document: Document) {
    const token = localStorage.getItem('currentUser');
    return this.http.put<Document>(
      environment.backendUrl + `/api/Invoices/edit`,
      document,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token!) }
    );
  }

  saveInvoice(invoice: InvoiceDocument) {
    const token = localStorage.getItem('currentUser');
    return this.http.post<string>(
      environment.backendUrl + '/api/invoices/save',
      invoice,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token!) }
    );
    // .pipe(map((data: string) => {
    //   return data;
    // }));
  }
}

export enum SortDate {
  Asc = 1,
  Desc = 0,
}
