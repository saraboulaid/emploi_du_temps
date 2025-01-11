import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {
  private apiUrl = 'http://127.0.0.1:8000/api/filieres';

  constructor(private http: HttpClient) {}


  getFilieres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  addFiliere(filiere: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, filiere);
  }


  updateFiliere(id: number, filiere: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, filiere);
  }


  deleteFiliere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
