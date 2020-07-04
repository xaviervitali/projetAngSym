import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { Subject, interval } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChanged = new Subject<boolean>();
  user: User;
  isModeratorOrAdmin = false;
  constructor(private http: HttpClient) {
    interval(5000).subscribe(() =>
      this.authChanged.next(this.isAuthenticated())
    );
  }

  isAuthenticated() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const data: any = jwtDecode(token);

    this.isModeratorOrAdmin =
      data.roles.includes('ROLE_ADMIN') ||
      data.roles.includes('ROLE_MODERATOR');

    this.user = data;
    return Date.now() < data.exp * 1000;
  }

  logout() {
    window.localStorage.removeItem('token');
    this.authChanged.next(false);
  }
  authenticate(credentials: Credential) {
    return this.http
      .post(environment.apiUrl + '/login_token', credentials)
      .pipe(
        tap((data: { token: string }) => {
          this.authChanged.next(true);
          window.localStorage.setItem('token', data.token);
        })
      );
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

  hasRole(role) {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const data: any = jwtDecode(token);
    return data.roles.includes(role);
  }
}

export interface Credential {
  username: string;
  password: string;
}
