import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterUser, UserData } from '../_models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserData[]>('/api/users/all');
  }

  getById(id: number) {
    return this.http.get<UserData>(`/api/users/${id}`);
  }

  approveUser(id: number) {
    // return this.http.put<string>(`/api/users/approve/${id}`);
  }

  rejectUser(id: number) {
    // return this.http.put<string>(`/api/users/reject/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`/api/users/delete/${id}`);
  }
}
