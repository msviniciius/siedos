import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicService {
  private apiUrl = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) { }

  getGenders(): Observable<Basic[]> {
    return this.http.get<BasicResponse>(`${this.apiUrl}/genders`).pipe(
      map(response => response.items)
    );
  }

  getStates(): Observable<Basic[]> {
    return this.http.get<BasicResponse>(`${this.apiUrl}/states`).pipe(
      map(response => response.items)
    );
  }

  getRoles(): Observable<Basic[]> {
    return this.http.get<BasicResponse>(`${this.apiUrl}/job-roles`).pipe(
      map(response => response.items)
    );
  }

  getWorkLocation(): Observable<Basic[]> {
    return this.http.get<BasicResponse>(`${this.apiUrl}/work-location`).pipe(
      map(response => response.items)
    );
  }
}

export interface Basic {
  id: number;
  name: string;
}

export interface BasicResponse {
  items: Basic[];
}
