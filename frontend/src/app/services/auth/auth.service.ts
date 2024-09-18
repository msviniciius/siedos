import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/v1';

  constructor(
    private http: HttpClient
  ) {}
  
  register(params: any): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/user/register`, params).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  login(params: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login`, params).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
        }
        return response;
      }),
      catchError(() => of({ success: false }))
    );
  }

  checkEmail(params: any): Observable<boolean> {
    return this.http.post<{ exists: boolean }>(`${this.apiUrl}/user/check-email`, params).pipe(
      map(response => response.exists),
      catchError(() => of(false))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}