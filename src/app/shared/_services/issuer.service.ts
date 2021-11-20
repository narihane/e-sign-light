import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Issuer } from '../_models/issuer.model';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from './notifications.service';
import { throwError } from 'rxjs';

@Injectable()
export class IssuerService {
  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getIssuer() {
    return this.http.get('/api/taxpayer/get');
  }

  createIssuer(issuer: Issuer) {
    const token = localStorage.getItem('currentUser');
    return this.http.post(environment.backendUrl +'/api/taxpayer/save', issuer,
    { headers: new HttpHeaders().set('Authorization','Bearer '+token!),
    }).pipe(map(data=>{
      this.notificationService.showSuccess("","Issuer information saved")
      return data;
    }),catchError(error => {
      this.notificationService.showError(error.error,"Error");
      return throwError('API sth went wrong!');
    }))
  }
}
