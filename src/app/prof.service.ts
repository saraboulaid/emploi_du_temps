import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfService {
  private baseUrl = 'http://localhost/api/profs';

  constructor(private http: HttpClient) {}

  getProfs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getProfById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addProf(prof: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, prof);
  }

  updateProf(id: number, prof: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/update`, prof);
  }

  deleteProf(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/delete`);
  }
}
