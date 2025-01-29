import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypeSceanceService {
  private baseUrl = 'http://localhost:8000/api/typeSeances';

  constructor(private http: HttpClient) {}

  getTypeSeances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getTypeSeanceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addTypeSeance(typeSeance: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, typeSeance);
  }

  updateTypeSeance(id: number, typeSeance: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/update`, typeSeance);
  }

  deleteTypeSeance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/delete`);
  }
}
