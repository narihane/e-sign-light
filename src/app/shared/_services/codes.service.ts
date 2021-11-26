import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CodeSearch, codesResult } from "../_models/codes.models";

@Injectable()
export class CodesService {
  constructor(private http: HttpClient) { }

  getCodes(pageNumber: number, pageSize: number) {
    const token = localStorage.getItem('currentUser');

    return this.http.get<codesResult>(environment.backendUrl + `/api/Codes/search/usages?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers: new HttpHeaders().set('Authorization','Bearer '+token!)}).pipe(map((data: codesResult) => {
        console.log(data.result)
        return data.result;
      }));
  }

  searchCodes(pageNumber: number, pageSize: number, searchName:string) {
    const token = localStorage.getItem('currentUser');

    return this.http.get<codesResult>(environment.backendUrl + `/api/Codes/search/usages?pageNumber=${pageNumber}&pageSize=${pageSize}
    &codeName=${searchName}`,
      { headers: new HttpHeaders().set('Authorization','Bearer '+token!)}).pipe(map((data: codesResult) => {
        console.log(data.result)
        return data.result;
      }));
  }
}
