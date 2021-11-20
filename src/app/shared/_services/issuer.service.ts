import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Issuer } from '../_models/issuer.model';

@Injectable()
export class IssuerService {
    constructor(private http: HttpClient) { }

    getIssuer() {
        return this.http.get('/api/taxpayer/get');
    }

    createIssuer(issuer: Issuer) {
        return this.http.post('/api/taxpayer/save', issuer);
    }
}
