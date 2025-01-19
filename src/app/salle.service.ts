import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private baseUrl = 'http://localhost:8080/api/salles';

  constructor(private http: HttpClient) {}

  getSalles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getSalleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addSalle(salle: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, salle);
  }

  updateSalle(id: number, salle: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/update`, salle);
  }

  deleteSalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/delete`);
  }
}
