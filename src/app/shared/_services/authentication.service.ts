import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { RegisterUser, User } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    console.log("currentUserSubject", this.currentUserSubject)
    console.log("currentUser", this.currentUser)
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    var body = {
      'userName': username,
      'password': password
    }
    return this.http.post<User>(environment.backendUrl + '/login', body).pipe(
      map((user: User) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log("Login successful", JSON.stringify(user))
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  registerAdmin(user: RegisterUser) {
    // Admin = 0
    user.userRole = 0;
    return this.http.post<any>('/register', { user });
  }

  registerUser(user: RegisterUser) {
    // User = 1
    return this.http.post<any>('/register', { user });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null as any);
  }
}
