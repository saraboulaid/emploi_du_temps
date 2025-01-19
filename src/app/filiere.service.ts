import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {
  private baseUrl = 'http://localhost:8080/api/filieres';

  constructor(private http: HttpClient) {}

  getFilieres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getFiliereById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addFiliere(filiere: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, filiere);
  }

  updateFiliere(id: number, filiere: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/update`, filiere);
  }

  deleteFiliere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/delete`);
  }
}
