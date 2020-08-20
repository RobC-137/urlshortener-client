import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  HttpClient,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
interface LoginData {
  email: string;
  password: string;
}

interface loginResponseObject {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private url: string = 'http://localhost:3000/';
  private url: string = 'https://urlshortener137.herokuapp.com/';
  private currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('currentUser'))
    );
  }

  getCurrentUSer(): BehaviorSubject<any> {
    return this.currentUserSubject;
  }

  getUserValue() {
    return this.currentUserSubject.value;
  }
  login(payload: LoginData) {
    return this.http
      .post(this.url + 'auth/login', payload)

      .pipe(
        map((user: loginResponseObject) => {
          const { accessToken } = user;
          localStorage.setItem('currentUser', JSON.stringify(accessToken));
          this.currentUserSubject.next(accessToken);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(payload: LoginData) {
    return this.http
      .post(this.url + 'auth/register', payload)

      .pipe(
        map((user: loginResponseObject) => {
          const { accessToken } = user;
          localStorage.setItem('currentUser', JSON.stringify(accessToken));
          this.currentUserSubject.next(accessToken);
          return user;
        })
      );
  }
}
