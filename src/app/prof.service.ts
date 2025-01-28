import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfService {
  private baseUrl = 'http://127.0.0.1:8000/api/profs';

  constructor(private http: HttpClient) {}

  getProfs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getProfById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  // Méthode pour assigner une matière au professeur
  assign(
    profId: number,
    assignData: { type_seance: string; matiere: number }
  ): Observable<any> {
    const url = `${this.baseUrl}/${profId}/assign`; // Construction de l'URL de l'API
    return this.http.post(url, assignData);
  }
  addProf(prof: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, prof);
  }

  updateProf(
    id: number,
    prof: { nom: string; prenom: string }
  ): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/update`, prof);
  }

  deleteProf(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/delete`);
  }
}
