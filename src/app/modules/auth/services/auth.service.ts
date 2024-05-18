import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Constants } from '../../../commons/constants/constants.enum';
import { UserRoles } from '../constants/user-roles.enum';
import { AuthenticatedUser } from '../models/authenticated-user.model';
import { UserCredentials } from '../models/user-credentials.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.API_URL}/auth`;

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, user);
  }

  login(payload: UserCredentials): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(`${this.apiUrl}/login`, payload);
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem(Constants.TOKEN_KEY);
    this.isLoggedIn$.next(!!token);
    return this.isLoggedIn$;
  }

  checkUserRoles(): Observable<UserRoles> {
    const userRole = localStorage.getItem(Constants.USER_ROLES) as UserRoles;
    return new Observable<UserRoles>((observer) => {
      observer.next(userRole);
    });
  }

  logout(): void {
    localStorage.removeItem(Constants.TOKEN_KEY);
    localStorage.removeItem(Constants.USER_ROLES);
    this.checkAuthStatus();
    this.router.navigate(['auth', 'login']);
  }
}
