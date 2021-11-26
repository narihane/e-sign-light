import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { User } from '../_models/user.model';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    var body = {
      'userName': username,
      'password': password
    }
    return this.http.post(environment.backendUrl + '/login', body, {
      responseType: 'text'
    }).pipe(
        map((user: any) => {
          // login successful if there's a jwt token in the response
          if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', user);
          }
          return user;
        }));
  }

  registerAdmin(user: User) {
    // Admin = 0
    user.userRole = 0;
    return this.http.post<any>('/register', { user });
  }

  registerUser(user: User) {
    // User = 1
    return this.http.post<any>('/register', { user });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
