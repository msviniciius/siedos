import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {
  private apiUrl = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) { }

  getAuditoria(): Observable<Auditoria[]> {
    return this.http.get<AuditoriaResponse>(`${this.apiUrl}/auditorias`).pipe(
      map(response => response.items)
    );
  }
}

export interface Auditoria {
  id: number;
  item: string;
  event: string;
  object: string;
  date: Date;
}

export interface AuditoriaResponse {
  items: Auditoria[];
}
